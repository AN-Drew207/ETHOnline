import Head from "next/head";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Notifications from "components/notifications/Notifications";
import AppLayout from "components/Layouts";

const NotificationsPage = () => {
  return (
    <>
      <AppLayout>
        <Notifications />
      </AppLayout>
    </>
  );
};

export default NotificationsPage;
