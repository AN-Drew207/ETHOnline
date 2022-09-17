import React from "react";
import {useWeb3React} from "@web3-react/core";

import useGetContract from "hooks/useGetContract";
import config from "utils/contracts/networks";

const useUserAccount = () => {
  const [userAccount, setUserAccount] = React.useState(null);
  const {chainId, account} = useWeb3React();
  const getContract = useGetContract();
  const {addresses} = config[chainId];

  const loadAccount = async () => {
    const lensHub = getContract("LensHub", addresses.lensHub);
    const accountId = await lensHub.tokenOfOwnerByIndex(account, 0);
    const profile = await lensHub.getProfile(accountId);
    setUserAccount(profile);
    console.log({profile});
  };

  React.useEffect(() => {
    loadAccount();
  }, [account]);

  return userAccount;
};

export default useUserAccount;
