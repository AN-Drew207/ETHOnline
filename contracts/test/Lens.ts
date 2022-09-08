import hre, {waffle, ethers} from "hardhat";

import {DataTypes} from "../types/@aave/lens-protocol/contracts/core/LensHub";
import {lensFixture} from "./fixtures/lens";
import {getReceipt} from "@utils/contracts";

const {loadFixture} = waffle;

describe.only("Lens", () => {
  it("Should deploy and interact with lens", async () => {
    const {lensHub, accounts} = await loadFixture(lensFixture);
    const user = accounts[1]; //interactor cant be owner

    await getReceipt(lensHub.setState(0));
    await getReceipt(lensHub.whitelistProfileCreator(user.address, true));
    const inputStruct: DataTypes.CreateProfileDataStruct = {
      to: user.address,
      handle: "zer0dot",
      imageURI: "https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan",
      followModule: ethers.constants.AddressZero,
      followModuleInitData: [],
      followNFTURI: "https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan",
    };
    await getReceipt(lensHub.connect(user).createProfile(inputStruct));
  });
});
