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
import {LendingPool__factory} from "../types/factories/contracts/TransferManager.sol/LendingPool__factory";

describe.only("test-module", () => {
  it("Should deploy and interact with lens", async () => {
    const addrs = await lensFixture();
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

    // const transferManager = await deployContract(
    //   new LendingPool__factory.deploy(23,342) 
    // );

    // const secretCodeFollowModule = await deployContract(
    //   new SubscriptionModule__factory(governance).deploy(32,lensHub.address, lensHub.address)
    // );
    // await waitForTx(lensHub.whitelistFollowModule(secretCodeFollowModule.address, true));
  
    // const data = defaultAbiCoder.encode(['uint256'], ['42069']);
    // await waitForTx(lensHub.connect(user).setFollowModule(1, secretCodeFollowModule.address, data));
  
    // const badData = defaultAbiCoder.encode(['uint256'], ['1337']);

  });
});
