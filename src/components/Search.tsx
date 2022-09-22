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
import clsx from "clsx";

const SearchProfileComponent = () => {
  const { account } = useWeb3React();
  const getContract = useGetContract();
  const client = useAuthClient();
  const { search: searched } = useRouter().query;
  const [search, { data: searchedData }] = useLazyQuery(SEARCH);
  const [type, setType] = React.useState("PROFILE");

  const handleSearch = async () => {
    await search({
      variables: {
        request: {
          query: searched,
          type: type, // type:PUBLICATION | PROFILE
          limit: 20,
        },
      },
    });
  };

  React.useEffect(() => {
    if (searched) {
      handleSearch();
    }
  }, [searched, type]);

  console.log(searchedData);

  return (
    <div className="flex flex-col md:py-8 py-4 w-full min-h-screen ">
      <div className="flex gap-2 pb-8">
        <h2
          className={clsx(
            "text-primary text-xl p-4 font-bold w-32 text-center rounded-xl border border-primary cursor-pointer",
            { ["!text-white !bg-primary"]: type == "PROFILE" },
          )}
          onClick={() => setType("PROFILE")}
        >
          Profiles
        </h2>
        <h2
          className={clsx(
            "text-primary text-xl p-4 font-bold w-32 text-center rounded-xl border border-primary cursor-pointer",
            { ["!text-white !bg-primary"]: type == "PUBLICATION" },
          )}
          onClick={() => setType("PUBLICATION")}
        >
          Posts
        </h2>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-4 w-full">
            {searchedData ? (
              searchedData.search.items.length > 0 ? (
                searchedData.search.items.map(
                  ({
                    profileId,
                    picture,
                    handle,
                    stats,
                    metadata,
                    profile,
                    hasCollectedByMe,

                    // video,
                  }) =>
                    type == "PROFILE" ? (
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
                    ) : (
                      <SimplePostComponent
                        name={profile?.name}
                        photo={
                          profile?.picture?.uri
                            ? convertLinkToIpfs(profile?.picture["uri"] || "")
                            : profile?.picture?.original
                            ? convertLinkToIpfs(
                                profile?.picture?.original?.url || "",
                              )
                            : "/icons/logo_simple.svg"
                        }
                        address={profile?.id}
                        message={metadata?.content}
                        onLike={() => null}
                        onMessage={() => null}
                        liked={hasCollectedByMe}
                        likes={stats["totalAmountOfCollects"]}
                        comments={stats["totalAmountOfComments"]}
                        image={
                          metadata?.media.length > 0
                            ? convertLinkToIpfs(metadata?.media[0].original.url)
                            : undefined
                        }
                      />
                    ),
                )
              ) : (
                <div className="flex items-center justify-center h-[70vh] text-primary text-3xl font-bold px-10">
                  This search has not any results, try with other!
                </div>
              )
            ) : (
              <div className="flex items-center justify-center h-[70vh]">
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
