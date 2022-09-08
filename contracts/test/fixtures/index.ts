import hre from "hardhat";

import {deploy} from "@utils/contracts";

import {superfluidFixture} from "./superfluid";
import {lensFixture} from "./lens";

export const basicFixture = async () => {
  const accounts = await hre.ethers.getSigners();
  const transferManager = await deploy(hre, "TransferManager", accounts[0], []);

  return {
    transferManager,
    ...(await superfluidFixture()),
    ...(await lensFixture()),
  };
};
