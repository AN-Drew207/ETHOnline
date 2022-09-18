import {Framework, ConstantFlowAgreementV1 as CFA, WrapperSuperToken} from "@superfluid-finance/sdk-core";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {BigNumberish} from "ethers";

import {Superfluid, ConstantFlowAgreementV1, SuperToken} from "../../types/index";

import {attach} from "@utils/contracts";
import {Provider} from "@ethersproject/providers";

import {deployFramework, deployWrapperSuperToken} from "@utils/superfluid/deploy";

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
    superToken: SuperToken;
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
    superToken: SuperToken;
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
  superToken: SuperToken;
  amount: string;
  signer: SignerWithAddress;
}) => {
  await superToken.upgrade(amount);
};

export const createSuperToken = async (
  hre: HardhatRuntimeEnvironment,
  {token, superfluid, signer}: {token: MockERC20; superfluid: Framework; signer: SignerWithAddress},
) => {
  const {
    host: {address: hostAddress},
  } = superfluid.contracts;
  const host = <Superfluid>await attach(hre, "Superfluid", hostAddress);
  const superToken = await deployWrapperSuperToken({
    admin: signer,
    superTokenFactoryAddress: await host.getSuperTokenFactory(),
    token: token.address,
    name: "MOCK",
    symbol: "MOCK",
  });

  return superToken as SuperToken;
};

export const deployEnvironment = async (hre: HardhatRuntimeEnvironment, signer: SignerWithAddress) => {
  const contractsFramework = await deployFramework(signer);

  const sf = await Framework.create({
    chainId: 31337,
    provider: signer.provider as Provider,
    resolverAddress: contractsFramework.resolver, //this is how you get the resolver address
    protocolReleaseVersion: "test",
  });

  return sf;
};
