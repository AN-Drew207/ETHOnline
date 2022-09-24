import {ethers} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {DataTypes, LensHub} from "../../types/@aave/lens-protocol/contracts/core/LensHub";

export const createSubscriptionProfile = async (args: {
  user: SignerWithAddress;
  profile: DataTypes.CreateProfileDataStruct;
  lensHub: LensHub;
  subscription: {
    followModule: string;
    flowRate: string;
    superToken: string;
  };
}) => {
  const {user, profile, lensHub, subscription} = args;

  await lensHub.whitelistProfileCreator(user.address, true);
  const profileId = await lensHub.connect(user).callStatic.createProfile(profile);
  await lensHub.connect(user).createProfile(profile);

  const data = ethers.utils.defaultAbiCoder.encode(
    ["int96", "address", "address"],
    [subscription.flowRate, subscription.superToken, user.address],
  );
  await lensHub.connect(user).setFollowModule(profileId, subscription.followModule, data);
  return profileId;
};
