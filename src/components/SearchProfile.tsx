import { SimplePostComponent } from "components/common/posts/post";
import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useLazyQuery, useQuery } from "@apollo/client";

import useGetContract from "hooks/useGetContract";
import useAuthClient from "hooks/useAuthClient";
import { SEARCH } from "utils/graphql/queries";
import { LoadingOutlined } from "@ant-design/icons";
import { convertLinkToIpfs } from "components/common/convertIPFStoLink";
import { useRouter } from "next/router";
import { SimpleProfileComponent } from "./common/simpleProfile";

const SearchProfileComponent = () => {
  const { account } = useWeb3React();
  const getContract = useGetContract();
  const client = useAuthClient();
  const { search: searched } = useRouter().query;

  const [search, { data: searchedData }] = useLazyQuery(SEARCH);

  const handleSearch = async () => {
    await search({
      variables: {
        request: {
          query: searched,
          type: "PROFILE", // type:PUBLICATION | PROFILE
          limit: 20,
        },
      },
    });
  };

  React.useEffect(() => {
    if (searched) {
      handleSearch();
    }
  }, [searched]);

  console.log(searchedData);

  return (
    <div className="flex flex-col md:py-8 py-4 w-full min-h-screen">
      <h1 className="text-primary text-3xl font-bold pb-8 w-full text-center">
        Profiles Searched
      </h1>
      <div className="flex w-full gap-4">
        <div className="flex flex-col 2xl:w-2/3">
          <div className="flex flex-col gap-4 w-full">
            {searchedData ? (
              searchedData.search.items.map(
                ({
                  profileId,
                  picture,
                  handle,
                  stats,
                  // video,
                }) => (
                  <SimpleProfileComponent
                    name={handle}
                    photo={
                      picture?.uri
                        ? convertLinkToIpfs(picture["uri"] || "")
                        : picture?.original
                        ? convertLinkToIpfs(picture?.original?.url || "")
                        : "/icons/logo_simple.svg"
                    }
                    address={profileId}
                  />
                ),
              )
            ) : (
              <div className="flex items-center justify-center h-[75vh]">
                <LoadingOutlined className="!text-primary text-4xl" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProfileComponent;
