import React from "react";
import { useWeb3React } from "@web3-react/core";
import {
  useMutation,
  useLazyQuery,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

import { AUTHENTICATION, GET_CHALLENGE } from "utils/graphql/queries";

let client: ApolloClient<object>;

const useAuthClient = () => {
  const { provider, account } = useWeb3React();
  const [getChallenge, { data: dataChallenge }] = useLazyQuery(GET_CHALLENGE);
  const [getAuth, { data }] = useMutation(AUTHENTICATION);

  const getSignature = async () => {
    if (client) return;
    const signer = provider.getSigner();
    const signature = await signer.signMessage(dataChallenge.challenge.text);
    await getAuth({ variables: { request: { address: account, signature } } });
  };

  React.useEffect(() => {
    if (account)
      getChallenge({
        variables: {
          request: {
            address: account,
          },
        },
      });
  }, [account]);

  React.useEffect(() => {
    if (account && dataChallenge) getSignature();
  }, [account, dataChallenge]);

  React.useEffect(() => {
    if (data) {
      const token = data.authenticate.accessToken;
      const curClient = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_LENS_SUBGRAPH_MUMBAI,
        cache: new InMemoryCache(),
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
        //link: authLink,
      });
      client = curClient;
    }
  }, [data]);

  return client;
};

export default useAuthClient;
