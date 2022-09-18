import {NFTStorage} from "nft.storage";

export async function uploadNFT(file: File, fields: {name: string; description: string}) {
  const {name, description} = fields;
  const client = new NFTStorage({token: process.env.NEXT_PUBLIC_STORAGE});
  const nft = {
    image: file, // use image Blob as `image` field
    name: "Storing the World's Most Valuable Virtual Assets with NFT.Storage",
    description: description,
    properties: {
      type: "follow-nft",
      origins: {
        http: "", //link to web page
      },
      authors: [{name: "Rcontre360"}],
      content: {
        "text/markdown": description,
      },
    },
  };
  const metadata = await client.store(nft);

  return {image: "", content: ""};
}
