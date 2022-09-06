declare module "*.md";

type SupportedNetworks = 137 | 4 | 1;

interface ERC721 {
  address: string;
  id: string;
  uri: string;
  name: string;
  symbol: string;
  hash: string;
  image: string;
  floor_price?: number;
  floor_price_usd?: number;
}

interface ERC20 {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance?: string;
}
