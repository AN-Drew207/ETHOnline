import { utils, providers, Contract } from "ethers";
import { config } from "dotenv";

config();

export function getEnvVariable(key: string, defaultValue?: string): string {
    if (process.env[key]) {
        return process.env[key] ?? "";
    }
    if (!defaultValue) {
        throw new Error(`${key} is not defined and no default value was provided`);
    }
    return defaultValue;
};

export function getPrivateKey() {
    const inputKey: string = getEnvVariable('PUBLIC_CHANNEL_PK');
    let privateKey;
    if (utils.isHexString(inputKey)) {
        privateKey = inputKey;
    }
    else {
        privateKey = "0x" + inputKey
    }
    return new utils.SigningKey(privateKey);
};

export function getProvider() {
    const providerURL: string = getEnvVariable('PUBLIC_WS_PROVIDER');
    return new providers.WebSocketProvider(providerURL);
};

export function getContracts() {
    const subsAdrs = "0xc9F6FB766211aF1e2fe0E4e6977a31A8Bcc4a0eC";
    const subsAbi = require('../abi/SubscriptionModule.json');
    const wsProvider = getProvider();

    const subsContract = new Contract(subsAdrs, subsAbi, wsProvider);

    return subsContract;
};
