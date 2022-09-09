import hre from "hardhat";

import {deploy} from "@utils/contracts";
import {createSuperToken, upgradeToken} from "@utils/superfluid";
import {superfluidFixture} from "./superfluid";
import {MockERC20} from "@sctypes/index";

import {lensFixture} from "./lens";

export const basicFixture = async () => {
  const {superfluid} = await superfluidFixture();
  const accounts = await hre.ethers.getSigners();
  const token = <MockERC20>await deploy(hre, "MockERC20", accounts[0], []);
  const superToken = await createSuperToken(hre, {token, superfluid});
  const amount = hre.ethers.utils.parseEther("10000").toString();
  const transferManager = await deploy(hre, "TransferManager", accounts[0], [
    superToken.address,
    superfluid.host.contract.address,
  ]);

  await token.mint(accounts[0].address, amount);
  await upgradeToken({superToken, amount, signer: accounts[0]});

  return {
    transferManager,
    token,
    superToken,
    superfluid,
    accounts,
    //...(await lensFixture()),
  };
};
