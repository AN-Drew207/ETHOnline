import Head from "next/head";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import AppLayout from "components/Layouts";
import { useRouter } from "next/router";

const Home = () => {
  // const { account } = useWeb3React();
  const router = useRouter();

  React.useEffect(() => {
    // if (!account) {
    router.push("/");
    // }
  }, []);
  return (
    <>
      <AppLayout>
        <div id="lp-register"></div>
      </AppLayout>
    </>
  );
};

export default Home;
