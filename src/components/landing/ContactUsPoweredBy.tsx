import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { NextPage } from "next";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Input } from "components/common/form/input";
import { Button } from "components/common/button";

const ContactUsPoweredBy: NextPage = () => {
  // const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
  };

  const rules = {
    fullName: {
      required: { value: true, message: "This is required" },
    },
    lastname: {
      required: { value: true, message: "This is required" },
    },
    email: {
      required: { value: true, message: "This is required" },
    },
    phoneNumber: {
      required: { value: true, message: "This is required" },
    },
    message: {
      required: { value: true, message: "This is required" },
    },
  };

  React.useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const poweredBy = [
    "/icons/epns.svg",
    "/icons/matic.svg",
    "/icons/superfluid.svg",
    "/icons/lens.svg",
    "/icons/xmtp.svg",
    "/icons/ipfs.png",
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-screen overflow-x-hidden">
      <div
        className="w-full h-full absolute top-0"
        style={{
          background:
            "linear-gradient(193.12deg, #F8BA4D 34.57%, #FF8A00 80.51%)",
        }}
      ></div>
      <div
        className="flex justify-end w-full"
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <div className="lg:w-[90vw] w-full min-h-[500px] py-8 flex flex-col items-center justify-center md:gap-20 gap-6 lg:rounded-l-full bg-overlay lg:px-16 px-2 relative">
          <h2 className="Oswald font-bold text-primary text-center xl:text-6xl text-3xl ">
            POWERED BY
          </h2>
          <div className="flex flex-wrap gap-16 items-center justify-center w-full">
            {poweredBy.map((item) => (
              <img src={item} className="rounded-full xl:w-[10%] w-32" />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-10 md:pt-16 pb-10">
        <div>
          <h2 className="text-3xl font-bold text-white">Contact Us</h2>
        </div>
        <div
          className={clsx(
            "flex xl:flex-row flex-col gap-8 items-center justify-between lg:w-4/5 w-full h-full sm:px-10 px-4 pb-10 relative",
          )}
        >
          <form
            className="xl:w-1/2 w-full flex flex-col md:gap-6 gap-4 items-center justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex md:flex-row flex-col justify-between w-full gap-4">
              <Input
                name="fullName"
                title="Full name *"
                placeholder="Name"
                register={register}
                rules={rules.fullName}
                error={errors.fullName}
                classNameContainer="f-22 w-full"
                primary
              />
              <Input
                name="email"
                title="Email *"
                placeholder="Email"
                register={register}
                rules={rules.fullName}
                error={errors.fullName}
                classNameContainer="f-22 w-full"
                primary
              />{" "}
            </div>
            <textarea
              name="message"
              title="Message *"
              placeholder="Message"
              ref={register("message", rules.fullName).ref}
              className="p-4 rounded-xl border h-[100px] placeholder-primary !focus:border-primary !focus:text-primary border-primary text-primary bg-transparent f-22 w-full focus:outline-none focus:bg-gray-opacity-10 focus:ring-offset-transparent focus:ring-opacity-0 focus:ring-transparent "
            />
            <div className="flex  md:justify-start justify-center w-full">
              <Button
                type="submit"
                disabled={isLoading}
                decoration="fillPrimary"
                className="px-16 py-4 text-white border-transparent bg-primary"
              >
                {isLoading ? "Loading" : "Send"}
              </Button>
            </div>
          </form>
          <div className="xl:w-1/2 w-full gap-10 flex flex-col items-center justify-center">
            <img src={"/icons/logo_green.svg"} className="w-96" alt="" />
            <div className="flex gap-4">
              {[
                "icons/linkedIn.svg",
                "icons/twitter.svg",
                "icons/github.svg",
              ].map((icon) => (
                <img src={icon} className="w-12 h-12" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPoweredBy;
