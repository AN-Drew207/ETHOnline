import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { NextPage } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Scrollbar, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import clsx from "clsx";

const Features: NextPage = () => {
  React.useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-screen">
      <div
        className="w-full h-full absolute top-0"
        style={{
          background: "linear-gradient(360deg, #F1D692 -83.4%, #FF9900 100%)",
        }}
      ></div>
      <div
        className="w-full relative"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <Swiper
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{ clickable: true }}
          zoom={true}
          modules={[Zoom, Pagination]}
          // className="mySwiper"
        >
          {[
            {
              title:
                "Follow different profiles to know about them and they content.",
              image: "/images/feature_home.png",
            },
            {
              title: "Get paid in crypto when users subscribe to your profile.",
              image: "/images/feature_follow.png",
            },
            {
              title:
                "Get notified when your followed content creators publish a new post",
              image: "/images/feature_notify.png",
            },
            {
              title:
                "Become a subscriptor and enjoy access to premium content, chat with your content creators and directly support them.",
              image: "/images/feature_chat.png",
            },
          ]?.map(({ title, image }) => {
            return (
              <SwiperSlide>
                <div className="w-full flex flex-col gap-4 items-center relative pb-10 md:px-0 px-4">
                  <img src={image} className="md:w-80 w-60" alt="" />
                  <p className="pt-4 Oswald text-center md:text-2xl text-lg text-primary md:w-1/2 w-full">
                    {title}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Features;
