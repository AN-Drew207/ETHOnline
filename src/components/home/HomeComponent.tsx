import { SimplePostComponent } from "components/common/posts/post";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "@apollo/client";

import useGetContract from "hooks/useGetContract";
import useAuthClient from "hooks/useAuthClient";
import { GET_PUBLICATIONS, CREATE_PROFILE } from "utils/graphql/queries";
import { makeMutation } from "utils/graphql";

const HomeComponent = () => {
  const { account } = useWeb3React();
  const getContract = useGetContract();
  const client = useAuthClient();
  const { data, loading, error } = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        profileId: "0x01",
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        limit: 10,
      },
    },
  });
  const { publications } = data || { publications: [] };

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
      name: "Andres",
      photo: "/icons/logo_simple.svg",
      address: "0x12Ee2c0Ca07F32a177eC4c07ea8574E183FdeaC4",
      message:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua pariatur. Ut enim ad minim ven",
      onLike: () => console.log("I like it"),
      onMessage: () => console.log("I message it"),
      liked: false,
      likes: 100,
      comments: 100,
    },
    {
      postId: 2,
      name: "Andres",
      photo: "/icons/logo_simple.svg",
      address: "0x12Ee2c0Ca07F32a177eC4c07ea8574E183FdeaC4",
      message:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua pariatur. Ut enim ad minim ven",
      onLike: () => console.log("I like it"),
      onMessage: () => console.log("I message it"),
      liked: true,
      likes: 100,
      comments: 100,
      image: "/icons/logo.svg",
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
            {postsMock.map(
              ({
                name,
                photo,
                address,
                message,
                onLike,
                onMessage,
                liked,
                likes,
                comments,
                image,
                // video,
              }) => (
                <SimplePostComponent
                  name={name}
                  photo={photo}
                  address={address}
                  message={message}
                  onLike={onLike}
                  onMessage={onMessage}
                  liked={liked}
                  likes={likes}
                  comments={comments}
                  image={image}
                />
              ),
            )}
          </div>
        </div>
        <div className="2xl:flex hidden flex-col border border-gray-300 shadow-md  w-1/3 rounded-xl p-4 sticky top-24">
          <h2 className="font-bold text-xl text-center text-primary">
            Suggestions
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
