import { useWeb3React } from "@web3-react/core";
import { attach, abis } from "utils/contracts";
import config, { Addresses } from "utils/contracts/networks";

const useGetProfile = () => {
  const { provider, chainId } = useWeb3React();
  return "";
};

export default useGetProfile;
