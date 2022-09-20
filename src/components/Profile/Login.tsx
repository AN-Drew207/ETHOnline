import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Input } from "components/common/form/input";
import { Button } from "components/common/button";
import { uploadNFT } from "utils/ipfs";
import { makeMutation } from "utils/graphql";
import { CREATE_PROFILE } from "utils/graphql/queries/profile";
import useAuthClient from "hooks/useAuthClient";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import WalletModal from "components/WalletModal";

const LoginComponent: React.FunctionComponent<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [login, setLogin] = React.useState<boolean>(false);

  const { account } = useWeb3React();

  const onSubmit = async (data: { handle: string }) => {
    setLogin(true);
    setIsLoading(true);
    //login common
    setIsLoading(false);
  };

  const rules = {
    handle: {
      required: { value: true, message: "This is required" },
    },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-[calc(100vh-40px)]">
      {/* <div className="w-full h-full absolute top-0"></div> */}
      <div
        className="w-4/5 flex flex-col items-center gap-10 pt-16 pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <div
          className={clsx(
            "flex flex-col items-center justify-center w-full h-full sm:px-10 px-4 pb-10",
          )}
        >
          <form
            className="w-2/3 flex flex-col gap-6 items-center justify-center relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="p-4 text-white border border-white"
            >
              {isLoading ? "Loading" : "Log In by your Favorite Wallet!"}
            </Button>
          </form>
          <p className="mt-4">
            Don{"'"}t have an account?{" "}
            <Link href="/app/register">
              <span className="text-secondary cursor-pointer">Register</span>
            </Link>
          </p>
        </div>
      </div>
      <WalletModal
        showModal={!Boolean(account) && login}
        setShowModal={() => 1}
        
      />
    </div>
  );
};

export default LoginComponent;
