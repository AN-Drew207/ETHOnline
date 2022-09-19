import useGetContract from "./useGetContract";
import useSendTransaction from "./useSendTransaction";

const useFollow = () => {
  const getContract = useGetContract();
  const {onSendTransaction, txState} = useSendTransaction();
  const lensHub = getContract("LensHub", "lensHub");

  const follow = async (profileIds: string[]) => {
    await onSendTransaction(
      lensHub.follow(
        profileIds,
        profileIds.map(() => "")
      )
    );
  };

  return {txState, follow};
};

export default useFollow;
