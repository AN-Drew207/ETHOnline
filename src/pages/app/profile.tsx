import { useWeb3React } from "@web3-react/core";
import AppLayout from "components/Layouts";
import ProfileComponent from "components/Profile/MyProfile";
import { useRouter } from "next/router";
import React from "react";

const Home = () => {
  const { account } = useWeb3React();
  const router = useRouter();

  React.useEffect(() => {
    if (!account) {
      router.push("/login");
    }
  }, [account]);
  return (
    <>
      <AppLayout>
        <ProfileComponent />
      </AppLayout>
    </>
  );
};

export default Home;
