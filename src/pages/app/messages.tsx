import React, { useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import useConversation from "hooks/useConversation";
import XmtpContext from "components/XMTPProvider/context";
import { SendOutlined } from "@ant-design/icons";
import { DateDivider, MessageChat } from "components/Chat/messageChat";
import clsx from "clsx";
import { AddressText } from "components/common/specialFields/SpecialFields";
import AppLayout from "components/Layouts";
import { useRouter } from "next/router";

const Chat = () => {
  const [message, setMessage] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const { client } = useContext(XmtpContext);
  const { messages, sendMessage, loading } = useConversation(
    recipient,
    onMessageCallback,
  );

  const [screen, setScreen] = React.useState("list");

  function onMessageCallback() {
    console.log("on message callback");
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    console.log("message", message);
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    setMessage("");
    sendMessage(message);
  };

  const isOnSameDay = (d1?: Date, d2?: Date): boolean => {
    return d1?.toDateString() === d2?.toDateString();
  };

  let lastMessageDate: Date | undefined;

  const { account } = useWeb3React();
  const router = useRouter();

  React.useEffect(() => {
    if (!account) {
      router.push("/app/login");
    }
  }, [account]);

  return (
    <AppLayout>
      <>
        <div className="md:flex hidden w-full chat">
          <div className="flex flex-col xl:w-[320px] md:w-[240px] p-2 gap-2 border-r border-gray-400">
            <h2 className="text-2xl font-bold text-primary pt-4 pb-2 text-center">
              Chats
            </h2>
            {Object.keys(messages).map((chat) => {
              return (
                <div
                  className={clsx(
                    {
                      ["bg-primary text-white"]:
                        chat.toLowerCase() == recipient.toLowerCase(),
                    },
                    {
                      ["bg-gray-100"]:
                        chat.toLowerCase() != recipient.toLowerCase(),
                    },
                    "w-full flex flex-col p-4 rounded-xl border-primary border cursor-pointer",
                  )}
                  onClick={() => setRecipient(chat)}
                >
                  <p className="font-bold truncate">{chat}</p>
                  <div className="w-full block overflow-hidden">
                    <p className="truncate inline">
                      {messages[chat][
                        messages[chat].length - 1
                      ].senderAddress.toLowerCase() ==
                      client.address.toLowerCase() ? (
                        "You"
                      ) : (
                        <AddressText
                          text={
                            messages[chat][messages[chat].length - 1]
                              .senderAddress
                          }
                        />
                      )}
                    </p>
                    <p className="truncate w-full inline">
                      {": "}
                      {messages[chat][messages[chat].length - 1].content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col xl:w-[calc(100vw-400px)] w-[calc(100vw-300px)] min-h-[calc(100vh-96px)] max-h-[calc(100vh-96px)] pl-4 py-4 gap-2">
            <div className="flex gap-2 w-full">
              <p className="font-bold text-xl">To</p>
              <input
                placeholder="Recipient"
                className="text-xl w-full focus:outline-none text-gray-600 bg-transparent"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="h-full w-full flex flex-col-reverse overflow-auto">
              <div className="h-max max-w-full flex flex-col justify-end gap-3 py-2">
                {messages[recipient]?.map((message) => {
                  const dateHasChanged = !isOnSameDay(
                    lastMessageDate,
                    message.sent,
                  );
                  lastMessageDate = message.sent;
                  return (
                    <>
                      {dateHasChanged ? (
                        <DateDivider date={message.sent} />
                      ) : null}
                      <MessageChat
                        message={message}
                        photo={"/icons/logo.png"}
                        name={message.senderAddress}
                      />
                    </>
                  );
                })}
              </div>
            </div>
            <div className="flex w-full items-center">
              <input
                className="border focus:outline-none border-gray-400 w-full p-2 rounded-xl"
                placeholder="Message"
                value={message}
                onChange={handleChange}
              />
              <button
                className="text-xl flex items-center p-2 justify-center"
                onClick={handleSendMessage}
              >
                <SendOutlined className="text-secondary" />
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden flex flex-col w-full chat">
          {recipient == "" ? (
            <div className="flex flex-col w-full p-2 border-r border-gray-400">
              <h2 className="text-2xl font-bold text-primary py-4 text-center">
                Chats
              </h2>
              {Object.keys(messages).map((chat) => {
                return (
                  <div
                    className={clsx(
                      {
                        ["bg-primary text-white"]:
                          chat.toLowerCase() == recipient.toLowerCase(),
                      },
                      {
                        ["bg-gray-100"]:
                          chat.toLowerCase() != recipient.toLowerCase(),
                      },
                      "w-full flex flex-col p-4 rounded-xl border-primary border cursor-pointer",
                    )}
                    onClick={() => setRecipient(chat)}
                  >
                    <p className="font-bold truncate">{chat}</p>
                    <div className="w-full block overflow-hidden">
                      <p className="truncate inline">
                        {messages[chat][
                          messages[chat].length - 1
                        ].senderAddress.toLowerCase() ==
                        client.address.toLowerCase() ? (
                          "You"
                        ) : (
                          <AddressText
                            text={
                              messages[chat][messages[chat].length - 1]
                                .senderAddress
                            }
                          />
                        )}
                      </p>
                      <p className="truncate w-full inline">
                        {": "}
                        {messages[chat][messages[chat].length - 1].content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col w-full min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] pl-4 py-4 gap-2">
              <div className="flex flex-wrap gap-2 w-full">
                <p
                  className="font-bold text-primary cursor-pointer"
                  onClick={() => setRecipient("")}
                >
                  Back
                </p>
                <div className="flex gap-2 w-full">
                  <p className="font-bold text-md">To</p>
                  <input
                    placeholder="Recipient"
                    className="text-md w-full focus:outline-none text-gray-600 bg-transparent truncate"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
              </div>
              <div className="h-full w-full flex flex-col-reverse overflow-auto">
                <div className="h-max max-w-full flex flex-col justify-end gap-3 py-2">
                  {messages[recipient]?.map((message) => {
                    const dateHasChanged = !isOnSameDay(
                      lastMessageDate,
                      message.sent,
                    );
                    lastMessageDate = message.sent;
                    return (
                      <>
                        {dateHasChanged ? (
                          <DateDivider date={message.sent} />
                        ) : null}
                        <MessageChat
                          message={message}
                          photo={"/icons/logo.png"}
                          name={message.senderAddress}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="flex w-full items-center">
                <input
                  className="border focus:outline-none border-gray-400 w-full p-2 rounded-xl"
                  placeholder="Message"
                  value={message}
                  onChange={handleChange}
                />
                <button
                  className="text-xl flex items-center p-2 justify-center"
                  onClick={handleSendMessage}
                >
                  <SendOutlined className="text-secondary" />
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    </AppLayout>
  );
};

export default Chat;
