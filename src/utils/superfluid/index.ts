import {BigNumberish, Contract} from "ethers";

export const approveFlow = async ({
  cfaV1,
  host,
  receiver,
  flowRate,
  superToken,
}: {
  flowRate?: BigNumberish;
  receiver: string;
  cfaV1: Contract;
  host: Contract;
  superToken: string;
}) => {
  let callData: string = "";

  if (flowRate)
    callData = cfaV1.interface.encodeFunctionData("updateFlowOperatorPermissions", [
      superToken,
      receiver,
      1,
      flowRate,
      [],
    ]);
  else
    callData = cfaV1.interface.encodeFunctionData("authorizeFlowOperatorWithFullControl", [
      superToken,
      receiver,
      [],
    ]);

  const receipt = await host.callAgreement(cfaV1.address, callData, "0x");
  return receipt;
};
