import React from "react";
import clsx from "clsx";

export const MessageChat: React.FC<any> = ({
  photo,
  name,
  message,
  image,
  video,
}) => {
  return (
    <div className="border border-gray-300 shadow-md rounded-xl gap-2 py-2 px-2 flex">
      <div className="w-full flex lg:flex-row flex-col gap-4 pt-1 justify-between">
        <div className="flex lg:flex-row flex-col">
          <div className="flex flex-col">
            <div className="flex">
              <p className="font-bold text-dark truncate flex gap-2 text-md">
                {name}
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
      </div>
    </div>
  );
};
