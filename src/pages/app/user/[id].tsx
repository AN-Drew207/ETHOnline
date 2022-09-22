import { convertLinkToIpfs } from "components/common/convertIPFStoLink";
import AppLayout from "components/Layouts";
import ProfileComponent from "components/Profile/MyProfile";
import ProfileOtherUserComponent from "components/Profile/ProfileOtherUser";
import useGetProfile from "hooks/useGetProfile";
import useGetProfilePublications from "hooks/useGetProfilePublications";
import { useRouter } from "next/router";
import postcss from "postcss";
import React from "react";

const Home = () => {
  const [profile, { data }] = useGetProfile();
  const [publications, { data: postsResult }] = useGetProfilePublications();
  const { id: profileId } = useRouter().query;
  const handleProfile = async () => {
    await profile({
      variables: {
        request: { profileId: profileId },
      },
    });
    //
  };

  const handlePosts = async () => {
    await publications({
      variables: {
        request: {
          profileId: profileId,
          publicationTypes: ["POST"],
        },
      },
    });
  };

  const { name, handle, bio, picture } = !data
    ? { name: "", handle: "", bio: "", picture: "" }
    : data?.profile;

  React.useEffect(() => {
    if (profileId) {
      handleProfile();
      handlePosts();
    }
  }, [profileId]);

  React.useEffect(() => {
    console.log(data, profileId, postsResult, "test");
  }, [data, postsResult]);

  return (
    <>
      <AppLayout>
        <ProfileOtherUserComponent
          name={handle}
          description={bio}
          photo={
            picture?.uri
              ? convertLinkToIpfs(picture?.uri || "")
              : picture?.original
              ? convertLinkToIpfs(picture?.original?.url || "")
              : "/icons/logo_simple.svg"
          }
          address={profileId ? profileId : ""}
          posts={postsResult?.publications?.items}
        />
      </AppLayout>
    </>
  );
};

export default Home;
