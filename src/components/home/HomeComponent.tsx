import { SimplePostComponent } from "components/common/posts/post";
import React, {useState} from "react";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "@apollo/client";

import useGetContract from "hooks/useGetContract";
import useAuthClient from "hooks/useAuthClient";
import { GET_PUBLICATIONS, CREATE_PROFILE } from "utils/graphql/queries";
import { makeMutation } from "utils/graphql";
import { Button } from "components/common/button";
import { profile } from "console";

const HomeComponent = () => {
  const { account } = useWeb3React();
  const getContract = useGetContract();
  const client = useAuthClient();
  const { data, loading, error } = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        profileId: "0x02",
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        limit: 10,
      },
    },
  });

  let publications = [];

  if (!loading) {
    publications = data.publications.items;
  }

  React.useEffect(() => {
    console.log("MAKE MUTATION");
    if (client && false)
      //to avoid error
      makeMutation({
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
      })
        .then((val) => {
          console.log("SUCCESS", val);
        })
        .catch((err) => {
          console.log("myErr", err);
        });
  }, [client]);

  const postsMock = [
    {
      postId: 1,
      name: "Carl",
      photo: "/images/profile2.png",
      address: "0x12Ee2c0Ca07F32a177eC4c07ea8574E183FdeaC4",
      message:
        "I'm having conversations with my suscribers now! Ask me something and I'll answer you!",
      onLike: () => console.log("I like it"),
      onMessage: () => console.log("I message it"),
      liked: false,
      likes: 85,
      comments: 30,
    },
    {
      postId: 2,
      name: "Andres",
      photo: "/images/profile1.png",
      address: "0x12Ee2c0Ca07F32a177eC4c07ea8574E183FdeaC4",
      message:
        "Merge is here! Please suscribe to my content to have all the information about this and a lot of things about blockchain! Join to the best community here in ShareEth, the best Web3 membership platform!",
      onLike: () => console.log("I like it"),
      onMessage: () => console.log("I message it"),
      liked: true,
      likes: 750,
      comments: 500,
      image: "/images/merge.jpg",
    },
    {
      postId: 3,
      name: "Carl",
      photo: "/images/profile2.png",
      address: "0x12Ee2c0Ca07F32a177eC4c07ea8574E183FdeaC4",
      message:
        "I'm excited for the merge! It is almost here, let's see how it goes!",
      onLike: () => console.log("I like it"),
      onMessage: () => console.log("I message it"),
      liked: false,
      likes: 145,
      comments: 40,
    },
  ];

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
      <h1 className="text-primary text-3xl font-bold pb-8 w-full text-center">
        Home
      </h1>
      <div className="flex w-full gap-4">
        <div className="flex flex-col 2xl:w-2/3">
          <div className="flex flex-col gap-4 w-full">
            {!loading ?
              publications.map(
                ({
                  profile,
                  metadata,
                  stats
                  // video,
                }) => (
                  <SimplePostComponent
                    name={profile['name']}
                    photo={profile['picture']['original']['url']}
                    address={profile['id']}
                    message={metadata['content']}
                    onLike={() => null}
                    onMessage={() => null}
                    liked={stats['totalAmountOfMirrors']}
                    likes={stats['totalAmountOfCollects']}
                    comments={stats['totalAmountOfComments']}
                    image={metadata['media']}
                  />
                ),
              ) : 
              <p>Loading...</p>
            }
          </div>
        </div>
        <div className="2xl:flex hidden flex-col border border-gray-300 shadow-md h-min w-1/3 rounded-xl p-4 sticky top-24 gap-4">
          <h2 className="font-bold text-xl text-center text-primary">
            Suggestions
          </h2>
          <div className="flex flex-col gap-3">
            {suggestionsMock.map(({ photo, name, address }) => {
              return (
                <div className="flex border border-gray-300 shadow-md gap-2 max-w-[100%] w-full rounded-md items-center justify-between">
                  <div className="w-2/3 flex gap-2 truncate">
                    <div className="sm:w-14 w-12 p-2 shrink-0 rounded-full">
                      <img
                        src={photo}
                        className="sm:w-10 sm:h-10 w-8 h-8 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col p-2 shrink-0 rounded-full truncate w-2/3">
                      <h3 className="font-bold text-md">{name}</h3>
                      <h3 className="text-sm truncate">{address}</h3>
                    </div>
                  </div>
                  <div className="p-2 shrink-0">
                    <Button
                      size="small"
                      className="py-1 text-[14px]"
                      decoration="fill"
                    >
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
