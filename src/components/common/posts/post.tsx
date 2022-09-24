import {
  CommentOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import React from "react";
import clsx from "clsx";
import Link from "next/link";
import dayjs from "dayjs";
import { useModal } from "hooks/useModal";

export const SimplePostComponent: React.FC<any> = ({
  id,
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
  const { Modal, isShow, show, hide } = useModal();
  return (
    <>
      <Modal hasBg={true} onClose={undefined} isShow={Boolean(isShow)}>
        <div className="flex flex-col h-[90vh] items-center justify-center">
          <div className="flex w-full text-transparent">x</div>
          <img src={image} className="h-[70vh] rounded-xl" alt="" />
        </div>
      </Modal>
      <Link href={"/app/post/" + id}>
        <div className="border border-gray-300 shadow-md rounded-xl gap-2  sm:px-4 py-4 px-2 flex w-full bg-white hover:bg-gray-100 cursor-pointer">
          <div className="sm:w-14 w-12 p-2 shrink-0 rounded-full">
            <img
              src={photo}
              className="sm:w-10 sm:h-10 w-8 h-8 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full flex lg:flex-row flex-col md:gap-12 gap-6 justify-between">
            <div className="flex lg:flex-row flex-col">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 z-10">
                  <Link href={`/app/user/${address}`}>
                    <p className="font-bold text-dark cursor-pointer truncate flex gap-2 text-md">
                      {name}
                      <span className="font-thin lowercase text-gray-500 sm:block hidden">
                        {address}
                      </span>
                    </p>
                  </Link>
                </div>
                <p className="text-justify">{message}</p>
                {image !== undefined ? (
                  <img
                    src={image}
                    onClick={(e) => {
                      e.stopPropagation();
                      show();
                    }}
                    className="w-full rounded-xl border border-gray-300 shadow-md cursor-pointer z-10"
                    alt=""
                  />
                ) : (
                  ""
                )}
                {video !== undefined ? (
                  <video
                    controls
                    src={video}
                    className="w-full rounded-xl border border-gray-300 shadow-md"
                  />
                ) : (
                  ""
                )}
                <span className="text-xs text-gray-500 pt-2">
                  {dayjs(new Date(timestamp)).fromNow()}
                </span>
              </div>
            </div>
            <div className="flex lg:flex-col flex-row-reverse lg:items-start items-center lg:justify-start justify-end lg:w-20 shrink-0 w-full lg:gap-1 gap-10">
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
                <CommentOutlined
                  className="text-xl"
                  onClick={() => onComment()}
                />
                <p className="text-sm font-thin">{comments}</p>{" "}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
