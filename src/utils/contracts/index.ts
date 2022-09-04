import {Contract} from "ethers";
import {ContractReceipt} from "@ethersproject/contracts";
import {LogDescription} from "@ethersproject/abi";

import superfluid from "./Superfluid";
import ercs from "./ERC";
import {TransactionResponse} from "@ethersproject/providers";

export const abis = {
  ...superfluid,
  ...ercs,
};

export const getLogs = (contract: Contract, transaction: ContractReceipt) => {
  const response: LogDescription[] = [];
  transaction.logs.forEach((log) => {
    try {
      if (log.address === contract.address) response.push(contract.interface.parseLog(log));
    } catch (err: any) {
      console.log("logs err", err);
    }
  });
  return response;
};

export const getReceipt = async (tx: Promise<TransactionResponse> | TransactionResponse) => {
  try {
    return await (await tx).wait();
  } catch (err: any) {
    console.log("getReceipt", err);
    throw err;
  }
};
