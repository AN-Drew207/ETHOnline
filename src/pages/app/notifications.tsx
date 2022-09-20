import Head from "next/head";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Notifications from "components/notifications/Notifications";
import AppLayout from "components/Layouts";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";

const NotificationsPage = () => {
  const { account } = useWeb3React();
  const router = useRouter();

  React.useEffect(() => {
    if (!account) {
      router.push("/app/login");
    }
  }, [account]);
  return (
    <>
      <AppLayout>
        <Notifications />
      </AppLayout>
    </>
  );
};

export default NotificationsPage;
