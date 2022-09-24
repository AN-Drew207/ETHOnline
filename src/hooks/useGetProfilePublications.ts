import { useLazyQuery } from "@apollo/client";
import { GET_PUBLICATIONS } from "utils/graphql/queries";

const useGetProfilePublications = () => {
  return useLazyQuery(GET_PUBLICATIONS);
};

// [makeQuery, {data,loading,info}]
// makeQuery({
//variables: { request: {
//query: "a",
//type: "PUBLICATION", // type:PUBLICATION | PROFILE
//limit: 10,
//},
//},
// })

export default useGetProfilePublications;
