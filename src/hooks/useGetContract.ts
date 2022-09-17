import {useWeb3React} from "@web3-react/core";
import {attach, abis} from "utils/contracts";
import config, {Addresses} from "utils/contracts/networks";

const useGetContract = () => {
  const {provider, chainId} = useWeb3React();

  return (contractName: keyof typeof abis, address: `0x${string}` | keyof Addresses) => {
    const {addresses} = config[chainId];
    if (addresses[address]) return attach(contractName, addresses[address], provider);
    return attach(contractName, address, provider);
  };
};

export default useGetContract;
