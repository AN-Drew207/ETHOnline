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
    AOS.init();
  }, []);

  const poweredBy = [
    "/icons/epns.svg",
    "/icons/matic.svg",
    "/icons/superfluid.svg",
    "/icons/lens.svg",
    "/icons/xmtp.svg",
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
        <div className="w-[90vw] min-h-[500px] flex flex-col items-center justify-center gap-20  rounded-l-full bg-overlay px-16 relative">
          <h2 className="Oswald font-bold text-primary text-center xl:text-6xl text-3xl ">
            POWERED BY
          </h2>
          <div className="flex flex-wrap gap-16 items-center justify-center w-full">
            {poweredBy.map((item) => (
              <img src={item} className="rounded-full w-[10%]" />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-10 pt-16 pb-10">
        <div>
          <h2 className="text-3xl font-bold text-white">Contact Us</h2>
        </div>
        <div
          className={clsx(
            "flex flex-col items-center justify-center w-full h-full sm:px-10 px-4 pb-10",
          )}
        >
          <form
            className="w-2/3 flex flex-col gap-6 items-center justify-center relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              name="fullName"
              title="Full name *"
              placeholder="John Doe"
              register={register}
              rules={rules.fullName}
              error={errors.fullName}
              classNameContainer="md:max-w-[472px f-22 w-full"
            />
            <Input
              name="email"
              title="Email *"
              placeholder="jonhdoe@mail.com"
              register={register}
              rules={rules.fullName}
              error={errors.fullName}
              classNameContainer="md:max-w-[472px f-22 w-full"
            />{" "}
            <Input
              name="message"
              title="Message *"
              placeholder="Message"
              register={register}
              rules={rules.fullName}
              error={errors.fullName}
              classNameContainer="md:max-w-[472px f-22 w-full"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="p-4 text-white border border-white"
            >
              {isLoading ? "Loading" : "Send"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPoweredBy;
