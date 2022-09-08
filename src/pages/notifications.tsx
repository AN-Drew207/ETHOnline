import Head from "next/head";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Notifications from "components/notifications/Notifications";

const NotificationsPage = () => {
  return (
    <>
      <Notifications />
    </>
  );
};

export default NotificationsPage;
