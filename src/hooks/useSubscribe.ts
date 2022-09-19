import {ethers} from "ethers";

import useGetContract from "./useGetContract";
import {approveFlow} from "utils/superfluid";

const useSubscribe = () => {
  const getContract = useGetContract();

  const subscribe = async (profileIds: string) => {
    const lensHub = getContract("LensHub", "lensHub");
    const cfaV1 = getContract("ConstantFlowAgreement", "cfaV1");
    const host = getContract("Superfluid", "host");
    const transferManager = getContract("TransferManager", "transferManager");
    const subscriptionModule = getContract("SubscriptionModule", "subscriptionModule");

    const flowRate = "";
    const superToken = "";

    const data = ethers.utils.defaultAbiCoder.encode(
      ["int96", "address", "address"],
      [flowRate, subscriptionModule.address, profileIds] //profileId should be address
    );

    await approveFlow({
      cfaV1,
      host,
      receiver: transferManager.address,
      flowRate,
      superToken,
    });
    await lensHub.follow([profileIds], [data]);
  };

  return {subscribe};
};

export default useSubscribe;
