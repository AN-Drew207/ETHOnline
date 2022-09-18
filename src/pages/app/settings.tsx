import Head from "next/head";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AppLayout from "components/Layouts";

const Home = () => {
  return (
    <>
      <AppLayout>
        <div id="lp-register"></div>
      </AppLayout>
    </>
  );
};

export default Home;
