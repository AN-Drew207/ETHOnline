export type Addresses = {
  lensHub: string;
  followNft: string;
  lensPeriphery: string;
};

export type Config = Record<string, {addresses: Addresses}>;

const config: Config = {
  "80001": {
    addresses: {
      lensHub: "0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5",
      followNft: "0xf51b134ca8f54fdf19eb49001fe337b1e93cf707",
      lensPeriphery: "0xa6bcF4398824A199965f89094796DFCcEa81b1a6",
    },
  },
};

export default config;
