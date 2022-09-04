import AppWrapper from "components/AppWrapper";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {Provider} from "react-redux";

import Web3Provider from "components/Web3Provider";
import {store} from "redux/store";
import "styles/globals.css";
import "styles/global-tailwind.css";
import "styles/index.css";

dayjs.extend(relativeTime);

const App = ({Component, pageProps}) => (
  <>
    <Provider store={store}>
      <Web3Provider>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </Web3Provider>
    </Provider>
  </>
);

export default App;
