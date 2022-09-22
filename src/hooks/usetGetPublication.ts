import { useLazyQuery } from "@apollo/client";
import { GET_PUBLICATION } from "utils/graphql/queries";

const useGetPublication = () => {
  return useLazyQuery(GET_PUBLICATION);
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

export default useGetPublication;
