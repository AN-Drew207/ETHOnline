import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { NextPage } from "next";
import clsx from "clsx";

const Features: NextPage = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div
        className="w-full h-full absolute top-0"
        style={{
          background: "linear-gradient(360deg, #F1D692 -83.4%, #FF9900 100%)",
        }}
      ></div>
      <div className="w-full flex items-center justify-center gap-10 h-screen"></div>
    </div>
  );
};

export default Features;
