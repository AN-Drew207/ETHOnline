export const convertLinkToIpfs = (inputURI: string) => {
  if (inputURI.includes("ipfs://")) {
    return "https://ipfs.io/ipfs/" + inputURI.substring(6);
  } else {
    return inputURI;
  }
};
