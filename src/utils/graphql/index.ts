import {ApolloClient, InMemoryCache, DocumentNode} from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_LENS_SUBGRAPH,
  cache: new InMemoryCache(),
});

export const makeQuery = async ({
  query,
  variables,
  client,
}: {
  query: DocumentNode;
  variables?: unknown;
  client?: ApolloClient<object>;
}) => {
  return await client.query({
    query,
    variables,
  });
};

export const makeMutation = async ({
  mutation,
  variables,
  client,
}: {
  mutation: DocumentNode;
  variables?: unknown;
  client?: ApolloClient<object>;
}) => {
  return await client.mutate({
    mutation,
    variables,
  });
};
