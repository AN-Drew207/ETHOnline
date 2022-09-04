import Head from "next/head";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = ({ userId }: { userId: string | null }) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="lp-register"></div>
    </>
  );
};

Home.getInitialProps = async ({ req }) => {
  return {
    userId: null,
  };
};

export default Home;
