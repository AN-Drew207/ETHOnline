import {expect} from "chai";
import {Framework, ConstantFlowAgreementV1 as CFA, WrapperSuperToken} from "@superfluid-finance/sdk-core";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {BigNumberish} from "ethers";

import {Superfluid, ConstantFlowAgreementV1} from "../../types/index";

import {attach} from "@utils/contracts";
import {Provider} from "@ethersproject/providers";
import {ITokenOptions} from "@superfluid-finance/sdk-core/dist/module/SuperToken";

const deployFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-framework");

type MockERC20 = any; //erc20 type

const HARDHAT_CHAIN_ID = 31337;

export const createFlow = async (
  hre: HardhatRuntimeEnvironment,
  {
    superToken,
    receiver,
    flowRate,
    sender,
    superfluid,
  }: {
    superToken: WrapperSuperToken;
    receiver: string;
    sender: SignerWithAddress;
    flowRate: string;
    superfluid: Framework;
  },
) => {
  return superfluid.cfaV1.createFlow({
    sender: sender.address,
    receiver,
    superToken: superToken.address,
    flowRate: flowRate,
  });
  //return receipt;
};

export const approveFlow = async (
  hre: HardhatRuntimeEnvironment,
  {
    sender,
    receiver,
    superToken,
    flowRate,
    superfluid,
  }: {
    sender: SignerWithAddress;
    receiver: string;
    superToken: WrapperSuperToken;
    flowRate?: BigNumberish;
    superfluid: Framework;
  },
) => {
  const {
    cfaV1: {address: cfaAddress},
    host: {address: hostAddress},
  } = superfluid.contracts;
  const host = <Superfluid>await attach(hre, "Superfluid", hostAddress);
  const cfa = <ConstantFlowAgreementV1>await attach(hre, "ConstantFlowAgreementV1", cfaAddress);
  let callData: string = "";

  if (flowRate)
    callData = cfa
      .connect(sender)
      .interface.encodeFunctionData("updateFlowOperatorPermissions", [superToken.address, receiver, 1, flowRate, []]);
  else
    callData = cfa
      .connect(sender)
      .interface.encodeFunctionData("authorizeFlowOperatorWithFullControl", [superToken.address, receiver, []]);

  const receipt = await host.connect(sender).callAgreement(cfaAddress, callData, "0x");
  return receipt;
};

export const upgradeToken = async ({
  superToken,
  amount,
  signer,
}: {
  superToken: WrapperSuperToken;
  amount: string;
  signer: SignerWithAddress;
}) => {
  await superToken.upgrade({amount}).exec(signer);
};

export const createSuperToken = async (
  hre: HardhatRuntimeEnvironment,
  {token, superfluid}: {token: MockERC20; superfluid: Framework},
) => {
  const {
    host: {address: hostAddress},
    cfaV1: {address: cfaV1Address},
    idaV1: {address: idaV1Address},
    governance: {address: governanceAddress},
    resolver: {address: resolverAddress},
  } = superfluid.contracts;
  const config: ITokenOptions["config"] = {
    hostAddress,
    cfaV1Address,
    idaV1Address,
    governanceAddress,
    resolverAddress,
  };

  const st = await WrapperSuperToken.create({
    address: token.address,
    config,
    provider: hre.ethers.provider,
    chainId: HARDHAT_CHAIN_ID,
  });
  return st as WrapperSuperToken;
};

export const deployEnvironment = async (hre: HardhatRuntimeEnvironment, signer: SignerWithAddress) => {
  const errorHandler = (err: Error) => {
    if (err) throw err;
  };

  await deployFramework(errorHandler, {
    web3: hre.web3,
    from: signer.address,
  });

  const [deployer] = await hre.ethers.getSigners();
  const sf = await Framework.create({
    chainId: HARDHAT_CHAIN_ID,
    provider: deployer.provider as Provider,
    resolverAddress: process.env.TEST_RESOLVER, //this is how you get the resolver address
    protocolReleaseVersion: "test",
  });
  console.log("SUCCESS");

  return sf;
};
