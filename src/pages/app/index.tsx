import { useWeb3React } from "@web3-react/core";
import HomeComponent from "components/home/HomeComponent";
import AppLayout from "components/Layouts";
import React from "react";

const Home = () => {
  return (
    <>
      <AppLayout>
        <HomeComponent />
      </AppLayout>
    </>
  );
};

export default Home;
