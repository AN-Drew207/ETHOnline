import { utils, Contract, Wallet } from "ethers";
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

export async function getContracts() {
    const lensHubAddress = "0x20f4D7DdeE23029048C53B42dc73A02De19F1c9E";
    const lensHubAbi = require('../abi/LensHub.json');
    const channelSigner = new Wallet(getPrivateKey());

    const lensContract = new Contract(lensHubAddress, lensHubAbi, channelSigner);

    return lensContract;
};
