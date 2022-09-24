import hre from "hardhat";
import {Framework} from "@superfluid-finance/sdk-core";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

import {deployEnvironment} from "@utils/superfluid";

interface SuperfluidFixture {
  superfluid: Framework;
  signer: SignerWithAddress;
  accounts: SignerWithAddress[];
}

export const superfluidFixture = async (): Promise<SuperfluidFixture> => {
  const accounts = await hre.ethers.getSigners();
  return {
    superfluid: await deployEnvironment(hre, accounts[0]),
    signer: accounts[0],
    accounts,
  };
};
