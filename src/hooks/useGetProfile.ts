import {useLazyQuery} from "@apollo/client";
import {GET_PROFILE} from "utils/graphql/queries";

const useGetProfile = () => {
  return useLazyQuery(GET_PROFILE);
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

export default useGetProfile;
