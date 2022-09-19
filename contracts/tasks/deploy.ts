import {task} from "hardhat/config";
import {Framework} from "@superfluid-finance/sdk-core";

import {deploy, attach} from "@utils/contracts";
import {writeJsonFile} from "@utils/index";
import {createSuperToken, upgradeToken} from "@utils/superfluid";
import {LensHub, MockERC20, ModuleGlobals, SubscriptionModule, TransferManager} from "@sctypes/index";
import config from "@utils/contracts/network";

task("deploy", "deploy our follow module")
  .addOptionalParam("protocol", "owner of chelo protocol address")
  .addOptionalParam("fee", "fee of protocol")
  .setAction(async (taskArgs, hre) => {
    const {ethers, network} = hre;
    const accounts = await ethers.getSigners();
    const {chainId} = await ethers.provider.getNetwork();
    const {addresses} = config[chainId];

    const superfluid = await Framework.create({
      chainId: chainId, //note, you can also use provider.getChainId() to get the active chainId
      provider: ethers,
    });
    const random = () => ethers.Wallet.createRandom().address;
    const lensHub = <LensHub>(
      await ethers.getContractFactory("LensHub", {
        libraries: {InteractionLogic: random(), ProfileTokenURILogic: random(), PublishingLogic: random()},
      })
    ).attach(addresses.lensHub); //random because on attach it doesnt matter
    const moduleGlobals = <ModuleGlobals>await attach(hre, "ModuleGlobals", addresses.moduleGlobals);

    const token = <MockERC20>await deploy(hre, "MockERC20", accounts[0], []);
    console.log("TOKEN", token.address);
    const superToken = await createSuperToken(hre, {token, superfluid, signer: accounts[0]});
    console.log("SUPER TOKEN", superToken.address);
    const amount = hre.ethers.utils.parseEther("10000").toString();

    await token.mint(accounts[0].address, amount);
    console.log("mint");
    await token.approve(superToken.address, amount);
    console.log("approve");
    //await upgradeToken({superToken, amount, signer: accounts[0]});
    //console.log("upgradeToken");
    await moduleGlobals.whitelistCurrency(superToken.address, true);
    console.log("globals");

    const transferManager = <TransferManager>(
      await deploy(hre, "TransferManager", accounts[0], [superToken.address, superfluid.host.contract.address])
    );
    console.log("TRANSFER MANAGER", transferManager.address);
    const subscriptionModule = <SubscriptionModule>(
      await deploy(hre, "SubscriptionModule", accounts[0], [
        transferManager.address,
        addresses.lensHub,
        addresses.moduleGlobals,
      ])
    );
    console.log("SUBSCRIPTION MODULE", subscriptionModule.address);
    await lensHub.whitelistFollowModule(subscriptionModule.address, true);

    writeJsonFile({
      path: `/addresses.${network.name}.json`,
      data: {
        subscriptionModule: subscriptionModule.address,
        transferManager: transferManager.address,
        token: token.address,
        superToken: superToken.address,
      },
    });
  });
