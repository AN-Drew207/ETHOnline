import {
  CommentOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import React from "react";
import clsx from "clsx";

export const SimplePostComponent: React.FC<any> = ({
  photo,
  name,
  address,
  message,
  image,
  video,
  onLike,
  onComment,
  likes,
  comments,
  liked,
}) => {
  return (
    <div className="border border-gray-400 rounded-xl gap-2 p-4 flex">
      <div className="w-14 p-2 shrink-0">
        <img src={photo} className="w-10 h-10 rounded-full" alt="" />
      </div>
      <div className="w-full flex lg:flex-row flex-col justify-between">
        <div className="flex lg:flex-row flex-col">
          <div className="flex flex-col gap-1">
            <div className="flex mb-2 gap-2">
              <p className="font-bold text-dark truncate flex gap-2 text-md">
                {name}
                <span className="font-thin lowercase text-gray-500">
                  {address}
                </span>
              </p>
            </div>
            <p>{message}</p>
            {image && <img src={image} className="w-full rounded-xl" alt="" />}
            {video && <video src={video} className="w-full rounded-xl" />}
          </div>
        </div>
        <div className="flex lg:flex-col flex-row-reverse lg:items-start items-center lg:justify-start justify-end lg:w-20 w-full lg:gap-0 gap-10">
          <EllipsisOutlined />
          <div
            className={clsx(
              { ["text-red-500"]: liked },
              "flex items-center gap-1",
            )}
            onClick={() => onLike()}
          >
            {liked ? (
              <HeartFilled className="text-xl" />
            ) : (
              <HeartOutlined className="text-xl" />
            )}{" "}
            <p className="text-sm font-thin">{likes}</p>{" "}
          </div>
          <div className="flex items-center gap-1">
            <CommentOutlined className="text-xl" onClick={() => onComment()} />
            <p className="text-sm font-thin">{comments}</p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
