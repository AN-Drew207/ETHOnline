import hre from "hardhat";

import {deploy} from "@utils/contracts";
import {createSuperToken, upgradeToken} from "@utils/superfluid";
import {superfluidFixture} from "./superfluid";
import {MockERC20, SubscriptionModule, TransferManager} from "@sctypes/index";

import {lensFixture} from "./lens";

export const basicFixture = async () => {
  const {superfluid, accounts, ...sf} = await superfluidFixture();
  const {lensHub, moduleGlobals, ...lens} = await lensFixture();

  const token = <MockERC20>await deploy(hre, "MockERC20", accounts[0], []);
  const superToken = await createSuperToken(hre, {token, superfluid, signer: accounts[0]});
  const amount = hre.ethers.utils.parseEther("10000").toString();

  await token.mint(accounts[0].address, amount);
  await token.approve(superToken.address, amount);
  await upgradeToken({superToken, amount, signer: accounts[0]});

  const transferManager = <TransferManager>(
    await deploy(hre, "TransferManager", accounts[0], [superToken.address, superfluid.host.contract.address])
  );
  const subscriptionModule = <SubscriptionModule>(
    await deploy(hre, "SubscriptionModule", accounts[0], [
      transferManager.address,
      lensHub.address,
      moduleGlobals.address,
    ])
  );

  return {
    transferManager,
    subscriptionModule,
    token,
    superToken,
    superfluid,
    lensHub,
    moduleGlobals,
    ...sf,
    ...lens,
  };
};
