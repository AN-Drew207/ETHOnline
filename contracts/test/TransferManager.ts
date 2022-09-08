import hre, {waffle} from "hardhat";

import {approveFlow, createFlow} from "@utils/superfluid";
import {basicFixture} from "./fixtures";

const {loadFixture} = waffle;

describe.only("TransferManager", () => {
  it("Should deploy properly", async () => {
    const {superfluid, accounts, transferManager, superToken} = await loadFixture(basicFixture);

    const res = await (
      await createFlow(hre, {
        superToken,
        sender: accounts[0],
        receiver: accounts[1].address,
        superfluid,
        flowRate: "10",
      })
    ).exec(accounts[0]);
    console.log(res);
    //await approveFlow(hre, {
    //sender: accounts[0],
    //receiver: transferManager.address,
    //superToken,
    //superfluid,
    //});
  });
});
