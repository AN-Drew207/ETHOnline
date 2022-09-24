import React from "react";
import {TransactionResponse} from "@ethersproject/providers";

const useSendTransaction = () => {
  const [state, setState] = React.useState<"sent" | "executed" | "error" | "none">("none");

  return {
    txState: state,
    onSendTransaction: async (tx: Promise<TransactionResponse>) => {
      try {
        const {wait} = await tx;
        setState("sent");
        await wait();
        setState("executed");
      } catch (err) {
        setState("error");
      }
    },
  };
};

export default useSendTransaction;
