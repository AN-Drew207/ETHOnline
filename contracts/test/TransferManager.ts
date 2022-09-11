import hre, { waffle } from "hardhat";

import { approveFlow, createFlow } from "@utils/superfluid";
import { basicFixture } from "./fixtures";

const { loadFixture } = waffle;

describe.only("TransferManager", () => {
  it("Should deploy properly", async () => {
    const { superfluid, accounts, transferManager, superToken } = await loadFixture(basicFixture);

    await approveFlow(hre, {
      sender: accounts[0],
      receiver: transferManager.address,
      superToken,
      superfluid,
    });
  });
});
