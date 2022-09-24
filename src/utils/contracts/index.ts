import {ethers, Contract} from "ethers";
import {ContractReceipt} from "@ethersproject/contracts";
import {LogDescription} from "@ethersproject/abi";

import lens from "./Lens";
import superfluid from "./Superfluid";
import ercs from "./ERC";
import shareEth from "./ShareEth";
import {TransactionResponse, Web3Provider} from "@ethersproject/providers";

export const abis = {
  ...shareEth,
  ...lens,
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

export function attach(contractName: keyof typeof abis, address: string, provider: Web3Provider) {
  return new ethers.Contract(address, abis[contractName], provider);
}
