import { SimplePostComponent } from "components/common/post";

const HomeComponent = () => {
  const postsMock = [
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
      postId: 1,
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
  ];
  return (
    <div className="flex flex-col md:py-8 w-full">
      <h1 className="text-dark text-2xl font-bold pb-4">Home</h1>
      <div className="flex w-full gap-4">
        <div className="flex flex-col 2xl:w-2/3">
          <div className="flex flex-col gap-2 w-full">
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
        <div className="2xl:flex hidden flex-col border border-gray-400 w-1/3 rounded-xl p-4 sticky top-24">
          <h2 className="font-bold text-2xl">Contacts</h2>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;