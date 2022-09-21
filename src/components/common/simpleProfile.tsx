import {
  CommentOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import React from "react";
import clsx from "clsx";
import Link from "next/link";

export const SimpleProfileComponent: React.FC<any> = ({
  photo,
  name,
  address,
  image,
}) => {
  console.log(image, "image");
  return (
    <div className="border border-gray-300 shadow-md rounded-xl gap-2  sm:px-4 py-4 px-2 flex w-full">
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
            <div className="flex gap-2">
              <Link href={`/app/user/${address}`}>
                <p className="font-bold text-dark cursor-pointer truncate flex gap-2 text-md">
                  {name}
                  <span className="font-thin lowercase text-gray-500">
                    {address.substring(0, 10)}...
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
