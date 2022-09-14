import React from "react";
import clsx from "clsx";
import Emoji from "react-emoji-render";
import { formatTime } from "components/common/specialFields/SpecialFields";

const isOnSameDay = (d1?: Date, d2?: Date): boolean => {
  return d1?.toDateString() === d2?.toDateString();
};

const formatDate = (d?: Date) =>
  d?.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const MessageTile = ({ message }: any): JSX.Element => (
  <div className="flex items-start mx-auto mb-4">
    <div className="ml-2">
      <span className="block text-md px-2 mt-2 text-black font-normal">
        {message.error ? (
          `Error: ${message.error?.message}`
        ) : (
          <Emoji text={message.content || ""} />
        )}
      </span>
    </div>
  </div>
);

export const DateDividerBorder: React.FC<any> = ({ children }) => (
  <>
    <div className="grow h-0.5 bg-gray-300/25" />
    {children}
    <div className="grow h-0.5 bg-gray-300/25" />
  </>
);

export const DateDivider = ({ date }: { date?: Date }): JSX.Element => (
  <div className="flex align-items-center items-center pb-4 pt-4">
    <DateDividerBorder>
      <span className="mx-10 flex-none text-primary text-sm font-bold">
        {formatDate(date)}
      </span>
    </DateDividerBorder>
  </div>
);

export const ConversationBeginningNotice = (): JSX.Element => (
  <div className="flex align-items-center justify-center pb-4">
    <span className="text-gray-300 text-sm font-semibold">
      This is the beginning of the conversation
    </span>
  </div>
);

export const MessageChat: React.FC<any> = ({
  photo,
  name,
  message,
  image,
  video,
}) => {
  return (
    <div className="border border-gray-300 shadow-md rounded-xl gap-2 py-2 px-2 flex xl:w-[calc(100%-10px)] w-[calc(100%-10px)] min-w-full overflow-hidden break-words">
      <div className="flex lg:flex-row flex-col gap-4 pt-1 justify-between xl:max-w-[calc(100vw-400px)] max-w-[calc(100vw-240px)] min-w-full overflow-hidden">
        <div className="flex lg:flex-row flex-col w-[calc(100%-10px)] min-w-full">
          <div className="flex flex-col w-full gap-2">
            <div className="flex w-full gap-4 justify-between">
              <p className="font-bold text-dark truncate flex gap-2 text-md">
                {name}
              </p>
              <div>
                <span className="text-[12px] font-normal place-self-end text-n-300 text-md uppercase whitespace-nowrap">
                  {formatTime(message.sent)}
                </span>
              </div>
            </div>
            <p className="text-justify break-words">
              {message.error ? (
                `Error: ${message.error?.message}`
              ) : (
                <Emoji text={message.content || ""} />
              )}
            </p>
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
