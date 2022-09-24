import { useModal } from "hooks/useModal";
import { Button } from "./button";
import { Typography } from "./typography";
import { useForm } from "react-hook-form";

export const MakeAPostButton = () => {
  const { Modal, isShow, show, hide } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Modal hasBg={true} onClose={undefined} isShow={Boolean(isShow)}>
        <div className="flex flex-col items-center bg-white gap-4 p-6 rounded-xl border-2 border-primary">
          <div className="flex w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => hide()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <form
            className="flex w-[70vw] flex-col items-end gap-4"
            onSubmit={handleSubmit((data) => console.log(data))}
          >
            <div className="flex gap-2 w-full rounded-xl overflow-hidden">
              <img
                src={"/icons/logo.png"}
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <textarea
                className="w-full resize-none h-[60vh] border border-gray-300 focus:outline-none focus:border-primary rounded-xl shadow-xl p-4"
                placeholder="Thinking something? Share it!"
                name="message"
                ref={register("message") && register("message").ref}
              ></textarea>
            </div>
            <Button decoration="fill" size="small" type="submit">
              Share it!
            </Button>
          </form>
        </div>
      </Modal>
      <Button onClick={() => show()} decoration="fill" size="small">
        Share it
      </Button>
    </>
  );
};
