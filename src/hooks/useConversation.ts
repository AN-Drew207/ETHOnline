import React from "react";
import { ethers } from "ethers";
import { Conversation, Message, Stream } from "@xmtp/xmtp-js";
import useXMTP from "hooks/useXMTP";
import useMessageStore from "./useMessageStore";

type OnMessageCallback = () => void;

const useConversation = (
  peerAddress: string,
  onMessageCallback?: OnMessageCallback,
) => {
  const { client } = useXMTP();
  const [messages, setMessages] = React.useState<Record<string, Message[]>>({});
  const { messageStore, dispatchMessages } = useMessageStore();
  const [conversations, setConversations] =
    React.useState<Conversation[]>(null);
  const [loading, setLoading] = React.useState<
    Record<"conversation" | "sendMessage", boolean>
  >({
    conversation: false,
    sendMessage: false,
  });
  const [stream, setStream] = React.useState<Stream<Message>>();
  const [conversation, setConversation] = React.useState<Conversation | null>(
    null,
  );

  React.useEffect(() => {
    const getConvo = async () => {
      if (!client || !peerAddress) {
        return;
      }
      setConversation(await client.conversations.newConversation(peerAddress));
    };
    getConvo();
  }, [peerAddress]);

  React.useEffect(() => {
    if (!conversation) return;
    const listMessages = async () => {
      setLoading((prev) => {
        return { ...prev, conversation: true };
      });
      const msgs = await conversation.messages();
      if (
        messageStore &&
        msgs.length !== messageStore[conversation.peerAddress]?.length
      ) {
        console.log(
          "Listing messages for peer address",
          conversation.peerAddress,
        );
        if (dispatchMessages) {
          await dispatchMessages({
            peerAddress: conversation.peerAddress,
            messages: msgs,
          });
        }
        if (onMessageCallback) {
          onMessageCallback();
        }
      }
      setLoading((prev) => {
        return { ...prev, conversation: false };
      });
    };
    const streamMessages = async () => {
      const stream = await conversation.streamMessages();
      setStream(stream);
      for await (const msg of stream) {
        if (dispatchMessages) {
          dispatchMessages({
            peerAddress: conversation.peerAddress,
            messages: [msg],
          });
        }
        if (onMessageCallback) {
          onMessageCallback();
        }
      }
    };
    listMessages();
    streamMessages();
  }, [conversation, dispatchMessages, onMessageCallback]);

  const handleLoading = (field: keyof typeof loading, value: boolean) => {
    setLoading((prev) => ({ ...prev, [field]: value }));
  };

  const loadConversations = async () => {
    const conversations = await client.conversations.list();
    setConversations(conversations);
    return conversations;
  };

  const loadMessages = async (conversations: Conversation[]) => {
    const map = {};
    for (const conv of conversations) {
      const messages = await conv.messages();
      map[conv.peerAddress] = messages;
    }
    setMessages((prev) => ({ ...prev, ...map }));
  };

  const sendMessage = async (message: string) => {
    handleLoading("conversation", true);
    const conv = conversations?.find(
      (conv) => conv.peerAddress === peerAddress,
    );
    if (conv) {
      const curMessage = await conv.send(message);
      const newMessages = messages[conv.peerAddress].concat([curMessage]);
      setMessages((prev) => ({ ...prev, [conv.peerAddress]: newMessages }));
    }
    handleLoading("conversation", false);
  };

  const listenConversation = async () => {
    const conv = conversations?.find(
      (conv) => conv.peerAddress === peerAddress,
    );
    if (!conv) return;
    for await (const message of await conv.streamMessages()) {
      if (message.senderAddress === client.address) {
        continue;
      }
      console.log("NEW MESSAGES");
      const newMessages = messages[conv.peerAddress].concat([message]);
      setMessages((prev) => ({ ...prev, [conv.peerAddress]: newMessages }));
    }
  };

  React.useEffect(() => {
    if (!client || !ethers.utils.isAddress(peerAddress)) return;

    listenConversation();
  }, [peerAddress]);

  React.useEffect(() => {
    const load = async () => {
      handleLoading("conversation", true);
      await loadMessages(await loadConversations());
      handleLoading("conversation", false);
    };

    if (!client) return;

    load();
  }, [client]);

  return {
    messages: messageStore[peerAddress] ?? [],
    sendMessage,
    loading,
  };
};

export default useConversation;
