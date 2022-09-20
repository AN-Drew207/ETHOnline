import {SimplePostComponent} from "components/common/posts/post";
import React, {useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {useLazyQuery, useQuery} from "@apollo/client";

import useGetContract from "hooks/useGetContract";
import useAuthClient from "hooks/useAuthClient";
import {CREATE_PROFILE, EXPLORE_PUBLICATIONS, SEARCH} from "utils/graphql/queries";
import {makeMutation} from "utils/graphql";
import {Button} from "components/common/button";
import {profile} from "console";

const HomeComponent = () => {
  const {account} = useWeb3React();
  const getContract = useGetContract();
  const client = useAuthClient();
  const [search, {data: searchedData}] = useLazyQuery(SEARCH);
  const {data, loading, error} = useQuery(EXPLORE_PUBLICATIONS, {
    variables: {
      request: {
        sortCriteria: "LATEST",
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        limit: 20,
      },
    },
  });
  const publications = data ? data.explorePublications.items : [];
  console.log({searchedData});

  const createProfile = async () => {
    if (client)
      await makeMutation({
        mutation: CREATE_PROFILE,
        variables: {
          request: {
            handle: "handletest360Some", //must change
            profilePictureUri: null,
            followNFTURI: null,
            followModule: null,
          },
        },
        client,
      });
  };

  const handleSearch = async () => {
    await search({
      variables: {
        request: {
          query: "a",
          type: "PUBLICATION", // type:PUBLICATION | PROFILE
          limit: 10,
        },
      },
    });
  };

  React.useEffect(() => {
    search();
  }, []);

  const suggestionsMock = [
    {
      suggestionId: 1,
      name: "Carl",
      photo: "/images/profile2.png",
      address: "0x12Ee2c0Ca07F32a177eC4c07ea8574E183FdeaC4",
    },
    {
      suggestionId: 2,
      name: "Andres",
      photo: "/images/profile1.png",
      address: "0x12Ee2c0Ca07F32a177eC4c07ea8574E183FdeaC4",
    },
  ];
  return (
    <div className="flex flex-col md:py-8 py-4 w-full">
      <h1 className="text-primary text-3xl font-bold pb-8 w-full text-center">Home</h1>
      <div className="flex w-full gap-4">
        <div className="flex flex-col 2xl:w-2/3">
          <div className="flex flex-col gap-4 w-full">
            {!loading ? (
              publications.map(
                ({
                  profile,
                  metadata,
                  stats,
                  // video,
                }) => (
                  <SimplePostComponent
                    name={profile["name"]}
                    photo={profile["picture"] ? profile["picture"]["original"]["url"] : ""}
                    address={profile["id"]}
                    message={metadata["content"]}
                    onLike={() => null}
                    onMessage={() => null}
                    liked={stats["totalAmountOfMirrors"]}
                    likes={stats["totalAmountOfCollects"]}
                    comments={stats["totalAmountOfComments"]}
                    image={metadata["media"]}
                  />
                )
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="2xl:flex hidden flex-col border border-gray-300 shadow-md h-min w-1/3 rounded-xl p-4 sticky top-24 gap-4">
          <h2 className="font-bold text-xl text-center text-primary">Suggestions</h2>
          <div className="flex flex-col gap-3">
            {suggestionsMock.map(({photo, name, address}) => {
              return (
                <div className="flex border border-gray-300 shadow-md gap-2 max-w-[100%] w-full rounded-md items-center justify-between">
                  <div className="w-2/3 flex gap-2 truncate">
                    <div className="sm:w-14 w-12 p-2 shrink-0 rounded-full">
                      <img src={photo} className="sm:w-10 sm:h-10 w-8 h-8 rounded-full" alt="" />
                    </div>
                    <div className="flex flex-col p-2 shrink-0 rounded-full truncate w-2/3">
                      <h3 className="font-bold text-md">{name}</h3>
                      <h3 className="text-sm truncate">{address}</h3>
                    </div>
                  </div>
                  <div className="p-2 shrink-0">
                    <Button size="small" className="py-1 text-[14px]" decoration="fill">
                      Follow
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
