import React from "react";
import {useWeb3React} from "@web3-react/core";
import useConversation from "hooks/useConversation";
import {Input} from "components/common/form/input";
import {Button} from "components/common/button";

const Home = () => {
  const [message, setMessage] = React.useState("");
  const {account} = useWeb3React();
  const {messages, sendMessage, loading} = useConversation(account, onMessageCallback);

  console.log({messages, loading});

  function onMessageCallback() {
    console.log("on message callback");
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(message);
  };

  return (
    <>
      <div id="lp-register">
        <Input onChange={handleChange} />
        <Button onClick={handleSendMessage} />
      </div>
    </>
  );
};

export default Home;
