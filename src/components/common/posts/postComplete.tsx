import {
  CommentOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import React from "react";
import clsx from "clsx";
import dayjs from "dayjs";

export const PostComponent: React.FC<any> = ({
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
  timestamp,
}) => {
  return (
    <div className="border border-gray-300 shadow-md rounded-xl gap-2  sm:px-4 py-4 px-2 flex">
      <div className="sm:w-14 w-12 p-2 shrink-0 rounded-full">
        <img
          src={photo}
          className="sm:w-10 sm:h-10 w-8 h-8 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full flex flex-col gap-4 justify-between">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex mb-2 gap-2">
              <p className="font-bold text-dark truncate flex gap-2 text-md">
                {name}
                <span className="font-thin lowercase text-gray-500">
                  {address}
                </span>
              </p>
            </div>
            <p className="text-justify">{message}</p>
            {image && (
              <img
                src={image}
                className="w-full rounded-xl border border-gray-300 shadow-md"
                alt=""
              />
            )}
            {video && (
              <video
                controls
                src={video}
                className="w-full rounded-xl border border-gray-300 shadow-md"
              />
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500">
          <span>
            {dayjs(new Date(timestamp)).format("hh:mm A · MMM D, YYYY")}
          </span>
        </p>
        <div className="flex flex-row-reverse items-center justify-end shrink-0 w-full gap-10">
          <EllipsisOutlined className="cursor-pointer" />
          <div
            className={clsx(
              { ["text-red-500"]: liked },
              "flex items-center gap-3 cursor-pointer",
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
          <div className="flex items-center gap-3 cursor-pointer">
            <CommentOutlined className="text-xl" onClick={() => onComment()} />
            <p className="text-sm font-thin">{comments}</p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
