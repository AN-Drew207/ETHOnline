import hre from "hardhat";
import {FollowNFT__factory, LensHub__factory} from "../types/factories/@aave/lens-protocol/contracts/core";
import {DataTypes} from "../types/@aave/lens-protocol/contracts/core/LensHub";
import {lensFixture} from "./fixtures/lens";

describe.only("test-module", () => {
  it("Should deploy and interact with lens", async () => {
    await lensFixture();
    //const addrs = getAddrs();
    //const lensHub = LensHub__factory.connect(addrs["lensHub proxy"], governance);
    //await waitForTx(lensHub.setState(ProtocolState.Unpaused));
    //await waitForTx(lensHub.whitelistProfileCreator(user.address, true));
    //const inputStruct: DataTypes.CreateProfileDataStruct = {
    //to: user.address,
    //handle: "zer0dot",
    //imageURI:
    //"https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan",
    //followModule: ZERO_ADDRESS,
    //followModuleInitData: [],
    //followNFTURI:
    //"https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan",
    //};
    //await waitForTx(lensHub.connect(user).createProfile(inputStruct));
  });
});
