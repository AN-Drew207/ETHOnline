import hre, {waffle, ethers} from "hardhat";

import {DataTypes} from "../types/@aave/lens-protocol/contracts/core/LensHub";
import {lensFixture} from "./fixtures/lens";
import {getReceipt} from "@utils/contracts";

const {loadFixture} = waffle;

describe.only("test-module", () => {
  it("Should deploy and interact with lens", async () => {
    const {lensHub, accounts} = await loadFixture(lensFixture);

    await getReceipt(lensHub.setState(1));
    await getReceipt(lensHub.whitelistProfileCreator(accounts[0].address, true));
    const inputStruct: DataTypes.CreateProfileDataStruct = {
      to: accounts[0].address,
      handle: "zer0dot",
      imageURI: "https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan",
      followModule: ethers.constants.AddressZero,
      followModuleInitData: [],
      followNFTURI: "https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan",
    };
    await getReceipt(lensHub.connect(accounts[0]).createProfile(inputStruct));
  });
});
