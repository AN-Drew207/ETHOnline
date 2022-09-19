import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "components/common/button";
import { MakeAPostButton } from "components/common/makeAPostButton";
import { SimplePostComponent } from "components/common/posts/post";

const ProfileComponent = () => {
  const profile = {
    name: "Carlos Torres",
    address: "0x11BD80De9438C2737aFD411893bde7d28254bAAd",
    photo: "/icons/logo.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dignissim lacus eget hendrerit convallis. Morbi consectetur quam et metus tincidunt, ac ullamcorper felis dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla eget ipsum cursus, interdum magna a, dignissim enim.",
    posts: [
      {
        postId: 1,
        name: "Andres",
        photo: "/icons/logo.png",
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
        photo: "/icons/logo.png",
        address: "0x12Ee2c0Ca07F32a177eC4c07ea8574E183FdeaC4",
        message:
          "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua pariatur. Ut enim ad minim ven",
        onLike: () => console.log("I like it"),
        onMessage: () => console.log("I message it"),
        liked: true,
        likes: 100,
        comments: 100,
        image: "/icons/logotype.png",
      },
      {
        postId: 3,
        name: "Andres",
        photo: "/icons/logo.png",
        address: "0x12Ee2c0Ca07F32a177eC4c07ea8574E183FdeaC4",
        message:
          "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua pariatur. Ut enim ad minim ven",
        onLike: () => console.log("I like it"),
        onMessage: () => console.log("I message it"),
        liked: true,
        likes: 100,
        comments: 100,
        image: "/icons/logotype.png",
      },
    ],
  };
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
                <img
                  src={profile.photo}
                  className="w-24 h-24 rounded-full"
                  alt=""
                />
              </div>
              {/* <div className="flex gap-2 w-full items-center"> */}
              <div className="flex flex-col items-center justify-center gap-2 md:px-16 px-4">
                <h2 className="text-xl font-bold text-dark">{profile.name}</h2>
                <h3 className="md:flex hidden text-sm text-gray-500 truncate">
                  {profile.address}
                </h3>
                <h3 className="flex md:hidden text-sm text-center text-gray-500 truncate">
                  {profile.address.substring(0, 10)}...
                </h3>
                <p className="text-sm text-center">{profile.description}</p>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-dark text-xl font-bold">My Posts</h1>
        <MakeAPostButton />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2 w-full">
          {profile.posts.map(
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
    </div>
  );
};

export default ProfileComponent;
