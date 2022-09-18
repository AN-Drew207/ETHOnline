import React from "react";
import clsx from "clsx";
import {useForm} from "react-hook-form";
import {Input} from "components/common/form/input";
import {Button} from "components/common/button";
import {uploadNFT} from "utils/ipfs";
import {makeMutation} from "utils/graphql";
import {CREATE_PROFILE} from "utils/graphql/queries/profile";
import useAuthClient from "hooks/useAuthClient";

const RegisterComponent: React.FunctionComponent<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: "onChange"});
  const client = useAuthClient();
  const [profilePicture, setProfilePicture] = React.useState<File>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: {handle: string}) => {
    setIsLoading(true);
    const {image, content} = await uploadNFT(profilePicture, {
      name: data.handle,
      description: `Hello! Im ${data.handle} and this is my shareEth profile`,
    });
    await makeMutation({
      client,
      mutation: CREATE_PROFILE,
      variables: {
        request: {
          handle: data.handle,
          profilePictureUri: image,
          followModule: null,
        },
      },
    });
    setIsLoading(false);
  };

  const rules = {
    handle: {
      required: {value: true, message: "This is required"},
    },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-screen">
      <div className="w-full h-full absolute top-0"></div>
      <div
        className="w-4/5 flex flex-col items-center gap-10 pt-16 pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <div>
          <h2 className="text-3xl font-bold"> Register a new account</h2>
        </div>
        <div
          className={clsx(
            "flex flex-col items-center justify-center w-full h-full sm:px-10 px-4 pb-10"
          )}
        >
          <form
            className="w-2/3 flex flex-col gap-6 items-center justify-center relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              name="handle"
              title="ShareEth handle"
              placeholder="vitalik.share"
              register={register}
              rules={rules.handle}
              error={errors.handle}
              classNameContainer="md:max-w-[472px] f-22 w-full"
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

export default RegisterComponent;
