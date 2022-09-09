import hre from "hardhat";
import {FollowNFT__factory, LensHub__factory} from "../types/factories/@aave/lens-protocol/contracts/core";
import {DataTypes} from "../types/@aave/lens-protocol/contracts/core/LensHub";
import {lensFixture} from "./fixtures/lens";
import {
  deployContract,
  getAddrs,
  initEnv,
  ProtocolState,
  waitForTx,
  ZERO_ADDRESS,
} from '../utils/index';
import {SubscriptionModule__factory} from "../types/factories/contracts/SubscriptionModule__factory";
import { SecretCodeFollowModule__factory } from "../types/factories/contracts/SecretCodeFollowModule__factory";
import {LendingPool__factory} from "../types/factories/contracts/TransferManager.sol/LendingPool__factory";
import { Contract } from "ethers";
import { defaultAbiCoder } from 'ethers/lib/utils';
const { ethers } = require("hardhat");
const { deployFramework, deployWrapperSuperToken } = require("./fixtures/deploy-sf")
const { Framework } = require("@superfluid-finance/sdk-core")



let addrs:any;
let owner: any;
let account1: any;
let account2: any;
let contractsFramework: any;
let dai: any;
let daix: any;
let sf: any;
let moneyRouter: Contract;
const tenKEther = ethers.utils.parseEther("10000")

before(async function () {
  addrs = await lensFixture();
  [owner, account1, account2] = await ethers.getSigners()

  //deploy the framework
  contractsFramework = await deployFramework(owner)
  const tokenPair = await deployWrapperSuperToken(
      owner,
      contractsFramework.superTokenFactory,
      "fDAI",
      "fDAI"
  )

  dai = tokenPair.underlyingToken
  daix = tokenPair.superToken

  // initialize the superfluid framework...put custom and web3 only bc we are using hardhat locally
  sf = await Framework.create({
      chainId: 31337,
      provider: owner.provider,
      resolverAddress: contractsFramework.resolver, //this is how you get the resolver address
      protocolReleaseVersion: "test"
  })

  let MoneyRouter = await ethers.getContractFactory("MoneyRouter", owner)

  moneyRouter = await MoneyRouter.deploy(
      sf.settings.config.hostAddress,
      owner.address
  )
  await moneyRouter.deployed()


})

beforeEach(async function () {
  await dai.mint(owner.address, tenKEther)

  await dai.mint(account1.address, tenKEther)

  await dai.mint(account2.address, tenKEther)

  await dai.connect(owner).approve(daix.address, tenKEther)
  await dai.connect(account1).approve(daix.address, tenKEther)
  await dai.connect(account2).approve(daix.address, tenKEther)

  await daix.upgrade(tenKEther)
  await daix.connect(account1).upgrade(tenKEther)
  await daix.connect(account2).upgrade(tenKEther)
})

describe.only("test-module", () => {
  it("Create a profile", async () => {
    const [governance, , user] = await initEnv(hre);
    const lensHub = LensHub__factory.connect(addrs.lensHub.address, governance);
    await waitForTx(lensHub.setState(ProtocolState.Unpaused));
    await waitForTx(lensHub.whitelistProfileCreator(user.address, true));
    const inputStruct: DataTypes.CreateProfileDataStruct = {
    to: user.address,
    handle: "zer0dot",
    imageURI:
    "https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan",
    followModule: ZERO_ADDRESS,
    followModuleInitData: [],
    followNFTURI:
    "https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan",
    };
    await waitForTx(lensHub.connect(user).createProfile(inputStruct));


    await dai.mint(owner.address, tenKEther)

    await dai.mint(account1.address, tenKEther)
  
    await dai.mint(account2.address, tenKEther)
  
    await dai.connect(owner).approve(daix.address, tenKEther)
    await dai.connect(account1).approve(daix.address, tenKEther)
    await dai.connect(account2).approve(daix.address, tenKEther)
  
    await daix.upgrade(tenKEther)
    await daix.connect(account1).upgrade(tenKEther)
    await daix.connect(account2).upgrade(tenKEther)

    
    const data = defaultAbiCoder.encode(['int96'], ['0']);
    const subscriptionModule = await deployContract(
      new SubscriptionModule__factory(governance).deploy(moneyRouter.address ,daix.address, lensHub.address, lensHub.address)
      );
      await waitForTx(lensHub.whitelistFollowModule(subscriptionModule.address, true));
      await waitForTx(lensHub.connect(user).setFollowModule(1, subscriptionModule.address, data));
    
    await waitForTx(lensHub.whitelistFollowModule(subscriptionModule.address, true));



    await waitForTx(lensHub.connect(user).setFollowModule(1, subscriptionModule.address, data));


    await waitForTx(lensHub.connect(user).follow([1], [data]));

    const followNFTAddr = await lensHub.getFollowNFT(1);
    const followNFT = FollowNFT__factory.connect(followNFTAddr, user);

    const totalSupply = await followNFT.totalSupply();
    const ownerOf = await followNFT.ownerOf(1);

    console.log(`Follow NFT total supply (should be 1): ${totalSupply}`);
    console.log(
      `Follow NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user.address}`
    );
      


  });
});
