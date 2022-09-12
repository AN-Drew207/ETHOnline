import React, { useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import useConversation from "hooks/useConversation";
import XmtpContext from "components/XMTPProvider/context";
import { SendOutlined } from "@ant-design/icons";
import { MessageChat } from "components/common/messageChat";

const Home = () => {
  const [message, setMessage] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const { client } = useContext(XmtpContext);
  const { messages, sendMessage, loading } = useConversation(
    recipient,
    onMessageCallback,
  );

  function onMessageCallback() {
    console.log("on message callback");
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    sendMessage(message);
  };

  console.log({ messages }, client, "qlq elmio");
  return (
    <>
      <div className="flex flex-col w-full min-h-[90vh] max-h-[90vh] py-4 gap-2">
        <div className="flex gap-2 w-full">
          <p className="font-bold text-xl">To</p>
          <input
            placeholder="Recipient"
            className="text-xl w-full focus:outline-none text-gray-600 bg-transparent"
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div className="h-full  flex flex-col-reverse overflow-auto">
          <div className="h-max flex flex-col justify-end gap-3 py-2">
            {new Array(10).fill(false)?.map((message) => {
              return (
                <MessageChat
                  message={"madremia willy"}
                  photo={"/icons/logo.png"}
                  name={"Carlos"}
                />
              );
            })}
          </div>
        </div>
        <div className="flex w-full items-center">
          <input
            className="border focus:outline-none border-primary w-full p-2 rounded-xl"
            placeholder="Message"
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
    </>
  );
};

export default Home;
