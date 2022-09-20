import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";

const HomeComponent: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] flex-col items-center justify-start md:mt-[56px] mt-[60px]">
      <div className="bg-primary opacity-75 absolute h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] w-full z-10"></div>
      <div className="bg-primary absolute z-0 top-0 max-h-[100vh] h-[100vh] w-full">
        <img
          src="/images/bg_main.png"
          className="lg:block hidden w-full min-h-[100vh]"
          alt=""
        />
        <img
          src="/images/bg_landing_mobile.jpg"
          className="lg:hidden sm:block hidden w-full min-h-[100vh]"
          alt=""
        />
        <img
          src="/images/bg_landing_mobile2.jpg"
          className="sm:hidden block w-full min-h-[100vh]"
          alt=""
        />
      </div>
      <div className="z-10 flex flex-col justify-center items-center w-full min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)]">
        <div className="flex lg:justify-between justify-center items-center w-full md:pr-24 md:pl-24 px-4">
          <div className="lg:w-[40%] w-full flex flex-col lg:items-start items-center gap-10 Oswald">
            <h1 className="xl:text-6xl lg:text-4xl md:text-6xl text-5xl lg:text-left text-center Oswald font-bold text-white">
              CREATE CONTENT <br />
              GET PAID <br />
              <div className="flex gap-2 items-center">
                {" "}
                AND{" "}
                <span className="text-secondary">
                  {" "}
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("SHARE IT")
                        .pauseFor(3000)
                        .deleteChars(2)
                        .typeString("ETH")
                        .pauseFor(3000)
                        .deleteAll()
                        .start();
                      setInterval(() => {
                        typewriter
                          .typeString("SHARE IT")
                          .pauseFor(3000)
                          .deleteChars(2)
                          .typeString("ETH")
                          .pauseFor(3000)
                          .deleteAll()
                          .start();
                      }, 7000);
                    }}
                  />
                </span>
              </div>
            </h1>
            <span className="font-medium text-xl lg:text-left Poppins text-white text-center">
              ShareEth is a membership platform that makes it easy for creators
              to get paid by crypto.
            </span>
            <button
              onClick={() => router.push("/app")}
              className="btnLanding rounded-md Poppins px-10 py-3 hover:text-secondary hover:border-secondary text-white bg-secondary border border-transparent font-bold"
            >
              Try It!
            </button>
          </div>
          <img
            src="/images/laptop_screen_fill.png"
            className="w-[50%] lg:block hidden"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
