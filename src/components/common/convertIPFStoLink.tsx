export const convertLinkToIpfs = (inputURI: string) => {
  if (inputURI.includes("ipfs://")) {
    return (
      "https://ipfs.io/ipfs/" + inputURI.substring(inputURI.indexOf("//") + 2)
    );
  } else {
    return inputURI;
  }
};
