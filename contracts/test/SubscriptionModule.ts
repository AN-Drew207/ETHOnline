import {expect} from "chai";
import hre, {waffle, ethers} from "hardhat";

import {approveFlow} from "@utils/superfluid";
import {createSubscriptionProfile} from "@utils/lens";
import {basicFixture} from "./fixtures";
import {DataTypes} from "../../types/@aave/lens-protocol/contracts/core/LensHub";

const {loadFixture} = waffle;

describe.only("SubscriptionModule", () => {
  it("Should interact with lens", async () => {
    const {superfluid, accounts, transferManager, superToken, lensHub, subscriptionModule} = await loadFixture(
      basicFixture,
    );
    const user = accounts[0];
    const flowRate = "200";

    const inputStruct: DataTypes.CreateProfileDataStruct = {
      to: user.address,
      handle: "zer0dot",
      imageURI: "https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan",
      followModule: ethers.constants.AddressZero,
      followModuleInitData: [],
      followNFTURI: "https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan",
    };

    await lensHub.whitelistFollowModule(subscriptionModule.address, true);
    await createSubscriptionProfile({
      user,
      profile: inputStruct,
      lensHub,
      subscription: {
        followModule: subscriptionModule.address,
        flowRate: flowRate,
        superToken: superToken.address,
      },
    });
  });
});
