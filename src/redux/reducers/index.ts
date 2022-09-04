import {createReducer} from "@reduxjs/toolkit";
import * as actions from "../actions";
import {ConnectionType} from "@helpers/connection";

interface InitialState {
    user: {
        address: string;
        wallet: ConnectionType;
        networkId: SupportedNetworks;
        erc20: DAO["tokens"];
        erc721: ERC721[];
        tx: {to: string; signature: string; args: unknown[]; show: boolean};
    };
    dao: AragonDAO | SnapshotDAO;

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
        tx: {to: "", signature: "", args: [] as unknown[], show: false},
    },
    dao: {
        id: "",
        name: "",
        mini_daos: [],
        tokens: [],
        members: [],
    } as AragonDAO | SnapshotDAO,

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

    builder.addCase(actions.onLoadWalletAssets.fulfilled, (state: InitialState, action) => {
        state.user.address = action.payload.account;
        state.user.wallet = action.payload.wallet;
        state.user.erc721 = action.payload.erc721;
        state.user.erc20 = action.payload.erc20;
    });

    builder.addCase(actions.onSwitchNetwork.fulfilled, (state: InitialState, action) => {
        state.user.networkId = action.payload.network;
    });

    builder.addCase(actions.onConnectAragonDao.fulfilled, (state: InitialState, action) => {
        state.dao = action.payload;
    });

    builder.addCase(actions.onConnectSnapshotDao.fulfilled, (state: InitialState, action) => {
        state.dao = action.payload;
    });

    //error handling
    builder.addCase(actions.onSwitchNetwork.rejected, (state: InitialState, action) => {
        state.error = action.payload;
    });

    builder.addCase(actions.onLoadWalletAssets.rejected, (state: InitialState, action) => {
        state.error = action.payload;
    });

    builder.addCase(actions.onConnectWallet.rejected, (state: InitialState, action) => {
        state.error = action.payload;
    });
});
