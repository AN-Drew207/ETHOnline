import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "components/common/button";
import { convertLinkToIpfs } from "components/common/convertIPFStoLink";
import { SimplePostComponent } from "components/common/posts/post";
import useFollow from "hooks/useFollow";
import useSubscribe from "hooks/useSubscribe";

const ProfileOtherUserComponent = ({
  name,
  address,
  photo,
  description,
  posts,
}) => {
  const { follow, txState } = useFollow();
  const { subscribe } = useSubscribe();

  return (
    <div className="flex flex-col md:py-8 py-4 gap-4 w-full">
      {/* <h1 className="text-primary text-3xl font-bold pb-8 w-full text-center">
        Profile
      </h1> */}
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="border border-gray-300 shadow-md  rounded-xl gap-2 p-4 flex">
            <div className="flex flex-col gap-4 w-full items-center justify-center">
              <div className="w-28 p-2 shrink-0">
                <img src={photo} className="w-24 h-24 rounded-full" alt="" />
              </div>
              <div>
                <div className="flex flex-col items-center justify-center gap-2 md:px-16 px-4">
                  <h2 className="text-xl font-bold text-dark">{name}</h2>
                  <h3 className="md:flex hidden text-sm text-gray-500 truncate">
                    {address}
                  </h3>
                  <h3 className="flex md:hidden text-sm text-center text-gray-500 truncate">
                    {address.substring(0, 10)}...
                  </h3>
                  <p className="text-sm text-center">{description}</p>
                </div>
              </div>{" "}
              <div className="w-full flex gap-4 items-center justify-center">
                {true ? (
                  <Button
                    size="small"
                    decoration="fill"
                    onClick={() => follow(["1"])}
                  >
                    Follow
                  </Button>
                ) : (
                  <Button size="small" decoration="line-primary">
                    Followed <CheckCircleOutlined />
                  </Button>
                )}
                {true ? (
                  <Button
                    size="small"
                    decoration="fill"
                    onClick={() => subscribe("1")}
                  >
                    Subscribe
                  </Button>
                ) : (
                  <Button size="small" decoration="line-primary">
                    Subscribed <CheckCircleOutlined />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-dark text-xl font-bold">Posts</h1>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2 w-full">
          {posts?.map(
            ({
              profile,
              metadata,
              stats,
              hasCollectedByMe,
              id,
              createdAt,
              // video,
            }) => (
              <SimplePostComponent
                id={id}
                name={profile["name"]}
                photo={
                  profile.picture?.uri
                    ? convertLinkToIpfs(profile.picture["uri"] || "")
                    : profile.picture?.original
                    ? convertLinkToIpfs(profile.picture?.original?.url || "")
                    : "/icons/logo_simple.svg"
                }
                address={profile["id"]}
                message={metadata["content"]}
                onLike={() => null}
                onMessage={() => null}
                liked={hasCollectedByMe}
                likes={stats["totalAmountOfCollects"]}
                comments={stats["totalAmountOfComments"]}
                image={
                  metadata["media"].length > 0
                    ? convertLinkToIpfs(metadata["media"][0].original.url)
                    : undefined
                }
                timestamp={createdAt}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOtherUserComponent;
