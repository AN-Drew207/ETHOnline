import {createAsyncThunk, createAction} from "@reduxjs/toolkit";

import * as actionTypes from "redux/constants";
import {ConnectionType} from "utils/connection";

type StateErrorType = {message: string; code: string; open: boolean};

export const onConnectWallet = createAsyncThunk<
  {erc20: ERC20[]; erc721: ERC721[]; account: string; wallet: ConnectionType},
  {wallet: ConnectionType; account: string},
  {rejectValue: StateErrorType}
>(actionTypes.CONNECT_WALLET, async ({wallet, account}, {rejectWithValue}) => {
  try {
    return {
      erc20: [],
      erc721: [],
      account,
      wallet,
    };
  } catch (err) {
    console.log(err);
    return rejectWithValue({
      message: err.message,
      code: err.code,
      open: true,
    });
  }
});

export const onDisconnectWallet = createAsyncThunk(actionTypes.CONNECT_WALLET, () => {
  return {
    account: "",
    erc20: [],
    erc721: [],
    wallet: "",
  };
});

export const onUpdateError = createAction(
  actionTypes.UPDATE_ERROR,
  (error: {message?: string; code?: string; open?: boolean}) => {
    return {payload: error};
  }
);
