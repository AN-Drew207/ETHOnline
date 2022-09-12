import {expect} from "chai";
import hre, {waffle} from "hardhat";

import {approveFlow} from "@utils/superfluid";
import {basicFixture} from "./fixtures";

const {loadFixture} = waffle;

describe("TransferManager", () => {
  it("Should deploy properly", async () => {
    const {superfluid, accounts, transferManager, superToken} = await loadFixture(basicFixture);
    const receiver = accounts[3];
    const flowRate = "200";

    await approveFlow(hre, {
      sender: accounts[0],
      receiver: transferManager.address,
      superToken,
      superfluid,
    });
    await transferManager.createFlow(superToken.address, accounts[0].address, receiver.address, flowRate);

    const flowInfo = await superfluid.cfaV1.getFlow({
      superToken: superToken.address,
      sender: accounts[0].address,
      receiver: receiver.address,
      providerOrSigner: accounts[0],
    });

    expect(flowInfo.flowRate, "Incorrect flow rate").to.be.equal(flowRate);
  });
});
