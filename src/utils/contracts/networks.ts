export type Addresses = {
  lensHub: string;
  followNft: string;
  lensPeriphery: string;
  subscriptionModule: string;
  transferManager: string;
  token: string;
  superToken: string;
};

export type Config = Record<string, {addresses: Addresses}>;

const config: Config = {
  "80001": {
    addresses: {
      lensHub: "0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5",
      followNft: "0xf51b134ca8f54fdf19eb49001fe337b1e93cf707",
      lensPeriphery: "0xa6bcF4398824A199965f89094796DFCcEa81b1a6",
      subscriptionModule: "0xdaDDA997E3f80879451A847022809ecb5a113952",
      transferManager: "0xbf3511F58E1C955e3f45c9F6ec9Dc0369c7D7c77",
      token: "0xe2E7731AC0cf86a1706425873f29Cfebaf3E1a0E",
      superToken: "0x74740f74e13C7af8e8B334FC1B70c8745c777Dd6",
    },
  },
};

export default config;
