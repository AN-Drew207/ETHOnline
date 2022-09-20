import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { NextPage } from "next";
import clsx from "clsx";

const AboutUs: NextPage = () => {
  React.useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="w-full flex flex-col justify-center relative" id="About">
      <div
        className="w-full h-full absolute top-0"
        style={{
          background: "#FF9900",
        }}
      ></div>
      <div className="lg:w-[calc(100vw-100px)] pb-10 relative">
        <div
          className="w-full min-h-[500px] bg-white lg:rounded-r-full flex lg:flex-row flex-col items-center justify-center xl:gap-60 lg:gap-48 gap-4 shadow-xl px-8 py-6"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
        >
          <div className="flex flex-col gap-10 lg:max-w-[50%]">
            <h2 className="font-bold text-primary md:text-left text-center xl:text-6xl text-3xl Oswald whitespace-nowrap">
              ABOUT US
            </h2>
            <p className="xl:text-lg text-md text-justify">
              ShareEth is a social networking app where readers find insighful
              ideas and connect with their favorite content creators, creators
              who share their great thoughts by posts that are neither private
              or public and can they get paid for it. All this in a
              decentralized, transparent and secure way.{" "}
            </p>
          </div>
          <div className="flex gap-4 p-4">
            <img src="/icons/logotype_about.svg" className="w-80" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
