import {createAsyncThunk} from "@reduxjs/toolkit";

import * as actionTypes from "redux/constants";

type StateErrorType = {message: string; code: string; open: boolean};

export const onLoginAccount = createAsyncThunk<
  {},
  {accessToken: string; handle: string},
  {rejectValue: StateErrorType}
>(actionTypes.CONNECT_WALLET, async ({accessToken, handle}, {rejectWithValue}) => {
  try {
    return {accessToken, handle};
  } catch (err) {
    console.log(err);
    return rejectWithValue({
      message: err.message,
      code: err.code,
      open: true,
    });
  }
});
