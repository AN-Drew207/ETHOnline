import hre, {waffle} from "hardhat";

import {superfluidFixture} from "./fixtures/superfluid";

const {loadFixture} = waffle;

describe.only("TransferManager", () => {
  it("Should deploy properly", async () => {
    const {superfluid, signer, accounts} = await loadFixture(superfluidFixture);
  });
});
