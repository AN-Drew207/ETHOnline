import hre from "hardhat";
import { hexlify, keccak256, RLP } from "ethers/lib/utils";
import { core, libraries, misc, upgradeability } from "../../types/factories/@aave/lens-protocol/contracts";
import { MockERC20__factory } from "../../types/index";
import { getReceipt } from "@utils/contracts";

const { LensHub__factory, CollectNFT__factory, FollowNFT__factory, modules } = core;
const { collect, follow, reference, ModuleGlobals__factory } = modules;
const {
  FreeCollectModule__factory,
  LimitedFeeCollectModule__factory,
  RevertCollectModule__factory,
  FeeCollectModule__factory,
  LimitedTimedFeeCollectModule__factory,
  TimedFeeCollectModule__factory,
} = collect;
const { FeeFollowModule__factory, ProfileFollowModule__factory, RevertFollowModule__factory } = follow;
const { FollowerOnlyReferenceModule__factory } = reference;
const { InteractionLogic__factory, PublishingLogic__factory, ProfileTokenURILogic__factory } = libraries;
const { TransparentUpgradeableProxy__factory } = upgradeability;
const { LensPeriphery__factory, UIDataProvider__factory, ProfileCreationProxy__factory } = misc;

const TREASURY_FEE_BPS = 50;
const LENS_HUB_NFT_NAME = "Lens Protocol Profiles";
const LENS_HUB_NFT_SYMBOL = "LPP";

async function deployContract(tx: any): Promise<any> {
  const result = await tx;
  await result.deployTransaction.wait();
  return result;
}

export const lensFixture = async () => {
  // Note that the use of these signers is a placeholder and is not meant to be used in
  // production.
  const ethers = hre.ethers;
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  const governance = accounts[1];
  const treasuryAddress = accounts[2].address;
  const proxyAdminAddress = deployer.address;
  const profileCreatorAddress = deployer.address;

  // Nonce management in case of deployment issues
  let deployerNonce = await ethers.provider.getTransactionCount(deployer.address);

  console.log("\n\t-- Deploying Module Globals --");
  const moduleGlobals = await deployContract(
    new ModuleGlobals__factory(deployer).deploy(governance.address, treasuryAddress, TREASURY_FEE_BPS, {
      nonce: deployerNonce++,
    }),
  );

  console.log("\n\t-- Deploying Logic Libs --");

  const publishingLogic = await deployContract(
    new PublishingLogic__factory(deployer).deploy({ nonce: deployerNonce++ }),
  );
  const interactionLogic = await deployContract(
    new InteractionLogic__factory(deployer).deploy({ nonce: deployerNonce++ }),
  );
  const profileTokenURILogic = await deployContract(
    new ProfileTokenURILogic__factory(deployer).deploy({ nonce: deployerNonce++ }),
  );
  const hubLibs = {
    "@aave/lens-protocol/contracts/libraries/PublishingLogic.sol:PublishingLogic": publishingLogic.address,
    "@aave/lens-protocol/contracts/libraries/InteractionLogic.sol:InteractionLogic": interactionLogic.address,
    "@aave/lens-protocol/contracts/libraries/ProfileTokenURILogic.sol:ProfileTokenURILogic":
      profileTokenURILogic.address,
  };

  // Here, we pre-compute the nonces and addresses used to deploy the contracts.
  // const nonce = await deployer.getTransactionCount();
  const followNFTNonce = hexlify(deployerNonce + 1);
  const collectNFTNonce = hexlify(deployerNonce + 2);
  const hubProxyNonce = hexlify(deployerNonce + 3);

  const followNFTImplAddress = "0x" + keccak256(RLP.encode([deployer.address, followNFTNonce])).substr(26);
  const collectNFTImplAddress = "0x" + keccak256(RLP.encode([deployer.address, collectNFTNonce])).substr(26);
  const hubProxyAddress = "0x" + keccak256(RLP.encode([deployer.address, hubProxyNonce])).substr(26);

  // Next, we deploy first the hub implementation, then the followNFT implementation, the collectNFT, and finally the
  // hub proxy with initialization.
  console.log("\n\t-- Deploying Hub Implementation --", { followNFTImplAddress, collectNFTImplAddress });

  const lensHubImpl = await deployContract(
    new LensHub__factory(hubLibs, deployer).deploy(followNFTImplAddress, collectNFTImplAddress, {
      nonce: deployerNonce++,
    }),
  );

  console.log("\n\t-- Deploying Follow & Collect NFT Implementations --");
  await deployContract(new FollowNFT__factory(deployer).deploy(hubProxyAddress, { nonce: deployerNonce++ }));
  await deployContract(new CollectNFT__factory(deployer).deploy(hubProxyAddress, { nonce: deployerNonce++ }));

  let data = lensHubImpl.interface.encodeFunctionData("initialize", [
    LENS_HUB_NFT_NAME,
    LENS_HUB_NFT_SYMBOL,
    governance.address,
  ]);

  console.log("\n\t-- Deploying Hub Proxy --");
  let proxy = await deployContract(
    new TransparentUpgradeableProxy__factory(deployer).deploy(lensHubImpl.address, proxyAdminAddress, data, {
      nonce: deployerNonce++,
    }),
  );

  // Connect the hub proxy to the LensHub factory and the governance for ease of use.
  const lensHub = LensHub__factory.connect(proxy.address, governance);

  console.log("\n\t-- Deploying Lens Periphery --");
  const lensPeriphery = await new LensPeriphery__factory(deployer).deploy(lensHub.address, {
    nonce: deployerNonce++,
  });

  // Currency
  console.log("\n\t-- Deploying Currency --");
  const currency = await deployContract(new MockERC20__factory(deployer).deploy({ nonce: deployerNonce++ }));

  // Deploy collect modules //By Rcontre360 comment
  console.log("\n\t-- Deploying feeCollectModule --");
  const feeCollectModule = await deployContract(
    new FeeCollectModule__factory(deployer).deploy(lensHub.address, moduleGlobals.address, {
      nonce: deployerNonce++,
    }),
  );
  console.log("\n\t-- Deploying limitedFeeCollectModule --");
  const limitedFeeCollectModule = await deployContract(
    new LimitedFeeCollectModule__factory(deployer).deploy(lensHub.address, moduleGlobals.address, {
      nonce: deployerNonce++,
    }),
  );
  console.log("\n\t-- Deploying timedFeeCollectModule --");
  const timedFeeCollectModule = await deployContract(
    new TimedFeeCollectModule__factory(deployer).deploy(lensHub.address, moduleGlobals.address, {
      nonce: deployerNonce++,
    }),
  );
  console.log("\n\t-- Deploying limitedTimedFeeCollectModule --");
  const limitedTimedFeeCollectModule = await deployContract(
    new LimitedTimedFeeCollectModule__factory(deployer).deploy(lensHub.address, moduleGlobals.address, {
      nonce: deployerNonce++,
    }),
  );

  console.log("\n\t-- Deploying revertCollectModule --");
  const revertCollectModule = await deployContract(
    new RevertCollectModule__factory(deployer).deploy({ nonce: deployerNonce++ }),
  );
  console.log("\n\t-- Deploying freeCollectModule --");
  const freeCollectModule = await deployContract(
    new FreeCollectModule__factory(deployer).deploy(lensHub.address, { nonce: deployerNonce++ }),
  );

  // Deploy follow modules
  console.log("\n\t-- Deploying feeFollowModule --");
  const feeFollowModule = await deployContract(
    new FeeFollowModule__factory(deployer).deploy(lensHub.address, moduleGlobals.address, {
      nonce: deployerNonce++,
    }),
  );
  console.log("\n\t-- Deploying profileFollowModule --");
  const profileFollowModule = await deployContract(
    new ProfileFollowModule__factory(deployer).deploy(lensHub.address, {
      nonce: deployerNonce++,
    }),
  );
  console.log("\n\t-- Deploying revertFollowModule --");
  const revertFollowModule = await deployContract(
    new RevertFollowModule__factory(deployer).deploy(lensHub.address, {
      nonce: deployerNonce++,
    }),
  );
  // --- COMMENTED OUT AS THIS IS NOT A LAUNCH MODULE ---
  // console.log('\n\t-- Deploying approvalFollowModule --');
  // const approvalFollowModule = await deployContract(
  //   new ApprovalFollowModule__factory(deployer).deploy(lensHub.address, { nonce: deployerNonce++ })
  // );

  // Deploy reference module
  console.log("\n\t-- Deploying followerOnlyReferenceModule --");
  const followerOnlyReferenceModule = await deployContract(
    new FollowerOnlyReferenceModule__factory(deployer).deploy(lensHub.address, {
      nonce: deployerNonce++,
    }),
  );

  // Deploy UIDataProvider
  console.log("\n\t-- Deploying UI Data Provider --");
  const uiDataProvider = await deployContract(
    new UIDataProvider__factory(deployer).deploy(lensHub.address, {
      nonce: deployerNonce++,
    }),
  );

  console.log("\n\t-- Deploying Profile Creation Proxy --");
  const profileCreationProxy = await deployContract(
    new ProfileCreationProxy__factory(deployer).deploy(profileCreatorAddress, lensHub.address, {
      nonce: deployerNonce++,
    }),
  );

  // Whitelist the collect modules
  console.log("\n\t-- Whitelisting Collect Modules --");
  let governanceNonce = await ethers.provider.getTransactionCount(governance.address);
  await getReceipt(lensHub.whitelistCollectModule(feeCollectModule.address, true, { nonce: governanceNonce++ })); // by Rcontre360
  await getReceipt(
    lensHub.whitelistCollectModule(limitedFeeCollectModule.address, true, {
      nonce: governanceNonce++,
    }),
  );
  await getReceipt(
    lensHub.whitelistCollectModule(timedFeeCollectModule.address, true, {
      nonce: governanceNonce++,
    }),
  );
  await getReceipt(
    lensHub.whitelistCollectModule(limitedTimedFeeCollectModule.address, true, {
      nonce: governanceNonce++,
    }),
  );
  await getReceipt(lensHub.whitelistCollectModule(revertCollectModule.address, true, { nonce: governanceNonce++ }));
  await getReceipt(lensHub.whitelistCollectModule(freeCollectModule.address, true, { nonce: governanceNonce++ }));

  // Whitelist the follow modules
  console.log("\n\t-- Whitelisting Follow Modules --");
  await getReceipt(lensHub.whitelistFollowModule(feeFollowModule.address, true, { nonce: governanceNonce++ }));
  await getReceipt(lensHub.whitelistFollowModule(profileFollowModule.address, true, { nonce: governanceNonce++ }));
  await getReceipt(lensHub.whitelistFollowModule(revertFollowModule.address, true, { nonce: governanceNonce++ }));
  // --- COMMENTED OUT AS THIS IS NOT A LAUNCH MODULE ---
  // await getReceipt(
  // lensHub.whitelistFollowModule(approvalFollowModule.address, true, { nonce: governanceNonce++ })
  // );

  // Whitelist the reference module
  console.log("\n\t-- Whitelisting Reference Module --");
  await getReceipt(
    lensHub.whitelistReferenceModule(followerOnlyReferenceModule.address, true, {
      nonce: governanceNonce++,
    }),
  );

  // Whitelist the currency
  console.log("\n\t-- Whitelisting Currency in Module Globals --");
  await getReceipt(
    moduleGlobals.connect(governance).whitelistCurrency(currency.address, true, { nonce: governanceNonce++ }),
  );

  // Whitelist the profile creation proxy
  console.log("\n\t-- Whitelisting Profile Creation Proxy --");
  await getReceipt(
    lensHub.whitelistProfileCreator(profileCreationProxy.address, true, {
      nonce: governanceNonce++,
    }),
  );

  await lensHub.connect(accounts[1]).setState(1); //unpaused
  // Save and log the addresses
  return {
    lensHub,
    lensHubImpl,
    publishingLogic,
    interactionLogic,
    followNFTImplAddress,
    collectNFTImplAddress,
    currency,
    lensPeriphery,
    moduleGlobals,
    feeCollectModule, //by Rcontre360
    limitedFeeCollectModule,
    timedFeeCollectModule,
    limitedTimedFeeCollectModule,
    revertCollectModule,
    freeCollectModule,
    feeFollowModule,
    profileFollowModule,
    revertFollowModule,
    // --- COMMENTED OUT AS THIS IS NOT A LAUNCH MODULE ---
    // 'approval follow module': approvalFollowModule.address,
    followerOnlyReferenceModule,
    uiDataProvider,
    profileCreationProxy,
    accounts,
  };
};

lensFixture();
