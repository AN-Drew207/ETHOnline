import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Provider } from "react-redux";

import Web3Provider from "components/Web3Provider";
import XmtpProvider from "components/XMTPProvider";
import { store } from "redux/store";
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
      <Web3Provider>
        <XmtpProvider>
          <Component {...pageProps} />
        </XmtpProvider>
      </Web3Provider>
    </Provider>
  </>
);

export default App;
