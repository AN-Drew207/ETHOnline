import "styles/globals.css";
import "styles/global-tailwind.css";
import "styles/index.css";
import AppWrapper from "components/AppWrapper";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const App = ({ Component, pageProps }) => (
  <>
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  </>
);

export default App;
