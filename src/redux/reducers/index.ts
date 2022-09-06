import {createReducer} from "@reduxjs/toolkit";
import * as actions from "../actions";
import {ConnectionType} from "utils/connection";

interface InitialState {
    user: {
        address: string;
        wallet: ConnectionType;
        networkId: SupportedNetworks;
        erc20: ERC20[];
        erc721: ERC721[];
    };

    error: {
        open: boolean;
        code: string;
        message: string;
    };
}

const INITIAL_STATE: InitialState = {
    user: {
        address: "",
        wallet: ConnectionType.INJECTED,
        networkId: null,
        erc721: [],
        erc20: [],
    },

    error: {
        open: false,
        message: "",
        code: "",
    },
};

export const daoReducer = createReducer(INITIAL_STATE, (builder) => {
    builder.addCase(actions.onConnectWallet.fulfilled, (state: InitialState, action) => {
        state.user.address = action.payload.account;
        state.user.wallet = action.payload.wallet;
        state.user.erc721 = action.payload.erc721;
        state.user.erc20 = action.payload.erc20;
    });

    builder.addCase(actions.onUpdateError, (state: InitialState, action) => {
        state.error = {...state.error, ...action.payload};
    });

    //error handling

    builder.addCase(actions.onConnectWallet.rejected, (state: InitialState, action) => {
        state.error = action.payload;
    });
});
