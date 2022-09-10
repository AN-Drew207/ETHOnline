import {useCallback, useEffect, useReducer, useState} from "react";
import {Conversation} from "@xmtp/xmtp-js";
import {Client} from "@xmtp/xmtp-js";
import {Signer} from "ethers";
import {XmtpContext, XmtpContextType} from "./context";
import {useWeb3React} from "@web3-react/core";

export const XmtpProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [client, setClient] = useState<Client | null>();
  const {provider} = useWeb3React();

  const [loadingConversations, setLoadingConversations] = useState<boolean>(false);

  const [conversations, dispatchConversations] = useReducer(
    (
      state: Map<string, Conversation>,
      newConvos: Conversation[] | undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): any => {
      if (newConvos === undefined) {
        return null;
      }
      newConvos.forEach((convo) => {
        if (convo.peerAddress !== client?.address) {
          if (state && !state.has(convo.peerAddress)) {
            state.set(convo.peerAddress, convo);
          } else if (state === null) {
            state = new Map();
            state.set(convo.peerAddress, convo);
          }
        }
      });
      return state ?? null;
    },
    []
  );

  const initClient = useCallback(async (wallet: Signer) => {
    if (wallet) {
      try {
        setClient(
          await Client.create(wallet, {
            env: process.env.NEXT_PUBLIC_ENVIRONMENT as "dev" | "production",
          })
        );
      } catch (e) {
        console.error(e);
        setClient(null);
      }
    }
  }, []);

  const disconnect = () => {
    setClient(undefined);
    dispatchConversations(undefined);
  };

  useEffect(() => {
    provider ? initClient(provider.getSigner()) : disconnect();
  }, [initClient, provider]);

  useEffect(() => {
    if (!client) return;

    const listConversations = async () => {
      console.log("Listing conversations");
      setLoadingConversations(true);
      const convos = await client.conversations.list();
      convos.forEach((convo: Conversation) => {
        dispatchConversations([convo]);
      });
      setLoadingConversations(false);
    };
    listConversations();
  }, [client]);

  const [providerState, setProviderState] = useState<XmtpContextType>({
    client,
    conversations,
    loadingConversations,
    initClient,
  });

  useEffect(() => {
    setProviderState({
      client,
      conversations,
      loadingConversations,
      initClient,
    });
  }, [client, conversations, initClient, loadingConversations]);

  return <XmtpContext.Provider value={providerState}>{children}</XmtpContext.Provider>;
};

export default XmtpProvider;
