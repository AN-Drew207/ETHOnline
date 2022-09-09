export const networkConfigs = {
  ethereum: {
    isActive: true,
    provider: null,
    addresses: {},
    graphEndpoints: {},
    settings: {
      logo: null,
      name: "Ethereum",
      moralis_name: "eth",
      explorer: "https://etherscan.io/",
      chainId: 1,
      testnet: false,
      live: true,
    },
    ipfs: {},
  },
  polygon: {
    isActive: true,
    provider: process.env.NEXT_PUBLIC_POLYGON_PROVIDER,
    addresses: {},
    graphEndpoints: {},
    settings: {
      chainId: 137,
      logo: "/multimedia/networks/matic.svg",
      name: "Polygon",
      moralis_name: "polygon",
      explorer: "https://polygonscan.com/",
      testnet: false,
      live: true,
    },
    ipfs: {},
  },
  rinkeby: {
    isActive: true,
    provider: process.env.NEXT_PUBLIC_RINKEBY_PROVIDER,
    addresses: {},
    graphEndpoints: {},
    settings: {
      logo: "/multimedia/networks/rinkeby.png",
      name: "Rinkeby",
      explorer: "https://rinkeby.etherscan.io/",
      moralis_name: "rinkeby",
      chainId: 4,
      testnet: true,
      live: true,
    },
    ipfs: {},
  },
};

const idToNetwork: Record<SupportedNetworks, string> = {
  137: "polygon",
  4: "rinkeby",
  1: "ethereum",
};

export function getNetworkConfig(networkId: SupportedNetworks) {
  return networkConfigs[idToNetwork[networkId]];
}
