export const convertLinkToIpfs = (ipfs: string) => {
  if (ipfs.includes("ipfs://")) {
    return "https://ipfs.io/ipfs/" + ipfs.substring(6);
  }
  return ipfs;
};
