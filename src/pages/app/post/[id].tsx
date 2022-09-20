import { Button } from "components/common/button";
import { CommentComponent } from "components/common/posts/comment";
import { PostComponent } from "components/common/posts/postComplete";
import AppLayout from "components/Layouts";
import { useForm } from "react-hook-form";

const Post = () => {
  const postMock = {
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
    cantComments: 2,
    image: "/icons/logo.svg",
    comments: [
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
    ],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <AppLayout>
      <div className="px-4 py-8 flex flex-col gap-4 w-full">
        <PostComponent
          name={postMock.name}
          photo={postMock.photo}
          address={postMock.address}
          message={postMock.message}
          onLike={postMock.onLike}
          onMessage={postMock.onMessage}
          liked={postMock.liked}
          likes={postMock.likes}
          comments={postMock.cantComments}
          image={postMock.image}
        />
        <div className="flex flex-col items-center bg-white gap-4 p-6 rounded-xl border border-gray-300">
          <form
            className="flex w-full flex-col items-end gap-4 chat"
            onSubmit={handleSubmit((data) => console.log(data))}
          >
            <div className="flex gap-2 w-full rounded-xl overflow-hidden ">
              <img
                src={"/icons/logo.png"}
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <textarea
                className="w-full resize-none border border-gray-300 focus:outline-none focus:border-primary rounded-xl shadow-xl p-4"
                placeholder="Thinking something? Share it!"
                name="message"
                ref={register("message") && register("message").ref}
              ></textarea>
            </div>
            <Button
              decoration="fill"
              size="small"
              className="!text-[14px] !px-4 !py-1"
              type="submit"
            >
              Comment
            </Button>
          </form>
        </div>
        {postMock.comments.map(
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
          }) => {
            return (
              <CommentComponent
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
            );
          },
        )}
      </div>
    </AppLayout>
  );
};

export async function getStaticPaths() {
  const paths = ["1"].map((b: any) => {
    return { params: { id: "1" } };
  });
  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps() {
  // const { query } = useRouter();

  return {
    // Passed to the page component as props
    props: {},
  };
}

export default Post;
