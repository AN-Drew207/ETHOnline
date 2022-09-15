import {useWeb3React} from "@web3-react/core";
import {attach, abis} from "utils/contracts";

const useGetContract = () => {
  const {provider} = useWeb3React();

  return (contractName: keyof typeof abis, address: string) => {
    return attach(contractName, address, provider);
  };
};

export default useGetContract;
