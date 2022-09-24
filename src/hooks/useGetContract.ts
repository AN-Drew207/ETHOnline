import { useWeb3React } from "@web3-react/core";
import { attach, abis } from "utils/contracts";
import config, { Addresses } from "utils/contracts/networks";

const useGetContract = () => {
  const { provider, chainId } = useWeb3React();

  return (
    contractName: keyof typeof abis,
    address: `0x${string}` | keyof Addresses,
  ) => {
    console.log(chainId);
    const { addresses } = config[chainId ? chainId : "80001"];
    console.log(addresses);
    if (addresses[address]) {
      const contract = attach(contractName, addresses[address], provider);
      console.log("by name", contract);
      return contract;
    }
    return attach(contractName, address, provider);
  };
};

export default useGetContract;
