import {expect} from "chai";
import hre, {waffle, ethers} from "hardhat";

import {approveFlow} from "@utils/superfluid";
import {createSubscriptionProfile} from "@utils/lens";
import {basicFixture} from "./fixtures";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

import {DataTypes, LensHub} from "@sctypes/@aave/lens-protocol/contracts/core/LensHub";
import {SubscriptionModule, SuperToken} from "@sctypes/index";

const {loadFixture} = waffle;

describe.only("SubscriptionModule", () => {
  const flowRate = "200";
  const createProfile = async ({
    user,
    lensHub,
    subscriptionModule,
    superToken,
  }: {
    user: SignerWithAddress;
    lensHub: LensHub;
    subscriptionModule: SubscriptionModule;
    superToken: SuperToken;
  }) => {
    const inputStruct: DataTypes.CreateProfileDataStruct = {
      to: user.address,
      handle: "zer0dot" + String(Math.random()),
      imageURI:
        "https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan" +
        String(Math.random()),
      followModule: ethers.constants.AddressZero,
      followModuleInitData: [],
      followNFTURI:
        "https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan" +
        String(Math.random()),
    };

    return await createSubscriptionProfile({
      user,
      profile: inputStruct,
      lensHub,
      subscription: {
        followModule: subscriptionModule.address,
        flowRate: flowRate,
        superToken: superToken.address,
      },
    });
  };

  it("Should interact with lens", async () => {
    const {superfluid, accounts, transferManager, superToken, lensHub, subscriptionModule} = await loadFixture(
      basicFixture,
    );
    const first = accounts[1];
    const second = accounts[2];
    const firstAccount = await createProfile({user: first, subscriptionModule, lensHub, superToken});
    await createProfile({user: second, subscriptionModule, lensHub, superToken});

    const data = ethers.utils.defaultAbiCoder.encode(
      ["int96", "address", "address"],
      [flowRate, subscriptionModule.address, second.address],
    );

    await approveFlow(hre, {
      superfluid,
      superToken,
      sender: second,
      receiver: transferManager.address,
    });
    await lensHub.connect(second).follow([firstAccount], [data]);

    const flowInfo = await superfluid.cfaV1.getFlow({
      superToken: superToken.address,
      sender: second.address,
      receiver: first.address,
      providerOrSigner: accounts[0],
    });

    expect(flowInfo.flowRate, "Incorrect flow rate").to.be.equal(flowRate);
  });
});
