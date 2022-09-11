import React, {useContext} from "react";
import {useWeb3React} from "@web3-react/core";
import useConversation from "hooks/useConversation";
import XmtpContext from "components/XMTPProvider/context";

const Home = () => {
  const [message, setMessage] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const {client} = useContext(XmtpContext);
  const {messages, sendMessage, loading} = useConversation(recipient, onMessageCallback);

  function onMessageCallback() {
    console.log("on message callback");
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    sendMessage(message);
  };

  console.log({messages});
  return (
    <>
      <div id="lp-register">
        <input className="bg-gray-300" onChange={handleChange} />
        <button className="bg-red-300 p-3" onClick={handleSendMessage}>
          send
        </button>

        <input
          placeholder="recipient"
          className="bg-gray-300"
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
    </>
  );
};

export default Home;
