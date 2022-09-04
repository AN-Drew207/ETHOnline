import { ReactNode, useEffect } from "react";
import Header from "components/Header";
import Footer from "components/Footer";

type Props = {
  children: ReactNode;
};

const AppWrapper = ({ children }: Props) => {
  return (
    <>
      {<Header />}
      {children}
      <span className="fa fa-gear fa-3x fa-spin"></span>
      {<Footer />}
    </>
  );
};

export default AppWrapper;
