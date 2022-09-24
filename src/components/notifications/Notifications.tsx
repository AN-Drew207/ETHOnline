import { NotificationComponent } from "components/common/notification";
import { SimplePostComponent } from "components/common/posts/post";

const Notifications = () => {
  const postsMock = [
    {
      postId: 1,
      name: "Andres",
      action: "has liked your post",
    },
    {
      postId: 2,
      name: "Andres",
      action: "has subscribed you",
    },
    {
      postId: 3,
      name: "Andres",
      action: "has liked your post",
    },
    {
      postId: 4,
      name: "Andres",
      action: "has liked your post",
    },
    {
      postId: 5,
      name: "Andres",
      action: "has liked your post",
    },
    {
      postId: 6,
      name: "Andres",
      action: "has liked your post",
    },
  ];
  return (
    <div className="flex flex-col md:py-8 py-4 w-full">
      <h1 className="text-primary text-3xl font-bold pb-8 w-full text-center">
        Notifications
      </h1>
      <div className="flex w-full gap-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-4 w-full">
            {postsMock.map(({ name, action }) => (
              <NotificationComponent name={name} action={action} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
