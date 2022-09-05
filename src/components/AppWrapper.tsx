import { ReactNode, useEffect } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import AppLayout from "./Layouts";

type Props = {
  children: ReactNode;
};

const AppWrapper = ({ children }: Props) => {
  return (
    <AppLayout>
      {children}
      <span className="fa fa-gear fa-3x fa-spin"></span>
    </AppLayout>
  );
};

export default AppWrapper;
