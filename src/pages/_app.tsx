import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

import Web3Provider from "components/Web3Provider";
import XmtpProvider from "components/XMTPProvider";
import { store } from "redux/store";
import { apolloClient } from "utils/graphql";
import "styles/globals.css";
import "styles/globals.scss";
import "styles/global-tailwind.css";
import "styles/index.css";
import AppLayout from "components/Layouts";
import Head from "next/head";

dayjs.extend(relativeTime);

const App = ({ Component, pageProps }) => (
  <>
    <Head>{<title>ShareEth</title>}</Head>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Web3Provider>
          <XmtpProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </XmtpProvider>
        </Web3Provider>
      </ApolloProvider>
    </Provider>
  </>
);

export default App;
