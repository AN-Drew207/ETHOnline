import {ApolloClient, InMemoryCache, DocumentNode} from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_LENS_SUBGRAPH,
  cache: new InMemoryCache(),
});

export const makeQuery = async (query: DocumentNode, variables?: unknown) => {
  try {
    console.log({variables, url: process.env.NEXT_PUBLIC_LENS_SUBGRAPH});
    const response = await apolloClient.query({
      query,
      variables,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
