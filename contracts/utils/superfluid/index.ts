import {expect} from "chai";
import {Framework} from "@superfluid-finance/sdk-core";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {BigNumberish} from "ethers";

import {SuperToken, SuperTokenFactory, Superfluid, ConstantFlowAgreementV1} from "../../types/index";

import {attach} from "@utils/contracts";

const deployFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-framework");

type MockERC20 = any; //erc20 type

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
    receiver: SignerWithAddress | string;
    sender: SignerWithAddress;
    flowRate: BigNumberish;
    superfluid: Framework;
  },
) => {
  const {
    cfaV1: {address: cfaAddress},
    host: {address: hostAddress},
  } = superfluid.contracts;
  const host = <Superfluid>await attach(hre, "Superfluid", hostAddress);
  const cfa = <ConstantFlowAgreementV1>await attach(hre, "ConstantFlowAgreementV1", cfaAddress);

  const finalReceiver = typeof receiver === "string" ? receiver : receiver.address;
  const callData = cfa.interface.encodeFunctionData("createFlow", [superToken.address, finalReceiver, flowRate, []]);

  const receipt = await host.connect(sender).callAgreement(cfaAddress, callData, "0x");
  const flow = await cfa.getFlow(superToken.address, sender.address, finalReceiver);

  expect(flow.flowRate, "Flow not created").to.be.equal(flowRate);

  return receipt;
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
    flowRate: BigNumberish;
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

  if (flowRate > 0)
    callData = cfa.interface.encodeFunctionData("updateFlowOperatorPermissions", [
      superToken.address,
      receiver,
      1,
      flowRate,
      [],
    ]);
  else
    callData = cfa.interface.encodeFunctionData("authorizeFlowOperatorWithFullControl", [
      superToken.address,
      receiver,
      [],
    ]);

  const receipt = await host.connect(sender).callAgreement(cfaAddress, callData, "0x");
  return receipt;
};

export const upgradeToken = async ({
  token,
  superToken,
  amount,
  signer,
}: {
  token: MockERC20;
  superToken: SuperToken;
  amount: BigNumberish;
  signer: SignerWithAddress;
}) => {
  await token.connect(signer).approve(superToken.address, amount);
  await superToken.connect(signer).upgrade(amount);
};

export const createSuperToken = async (
  hre: HardhatRuntimeEnvironment,
  {token, superfluid}: {token: MockERC20; superfluid: Framework},
) => {
  const {
    host: {address: hostAddress},
  } = superfluid.contracts;

  const host = <Superfluid>await attach(hre, "Superfluid", hostAddress);
  const superTokenFactory = <SuperTokenFactory>(
    await attach(hre, "SuperTokenFactory", await host.getSuperTokenFactory())
  );
  console.log({superTokenFactory: superTokenFactory.address});
  const superTokenAddress = await superTokenFactory.callStatic["createERC20Wrapper(address,uint8,string,string)"](
    token.address,
    0,
    "Super mock",
    "SMT",
  );

  await superTokenFactory["createERC20Wrapper(address,uint8,string,string)"](token.address, 1, "Super mock", "SMT");
  return <SuperToken>await attach(hre, "SuperToken", superTokenAddress);
};

export const deployEnvironment = async (hre: HardhatRuntimeEnvironment, signer: SignerWithAddress) => {
  const errorHandler = (err: Error) => {
    if (err) throw err;
  };

  await deployFramework(errorHandler, {
    web3: hre.web3,
    from: signer.address,
  });

  const sf = await Framework.create({
    chainId: hre.network.config.chainId || 1,
    provider: hre.ethers,
    resolverAddress: process.env.TEST_RESOLVER, //this is how you get the resolver address
    protocolReleaseVersion: "test",
  });

  return sf;
};
