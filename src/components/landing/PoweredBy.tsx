import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { NextPage } from "next";
import clsx from "clsx";

const PoweredBy: NextPage = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div className="w-full h-full absolute top-0"></div>
      <div className="w-4/5 flex flex-col items-center justify-center gap-10 py-10"></div>
    </div>
  );
};

export default PoweredBy;
