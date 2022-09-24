import Decimal from "decimal.js";
import {BigNumberish, ethers} from "ethers";
import {FC} from "react";

const EtherFormatted: FC<{wei: BigNumberish}> = ({wei}) => {
  const etherDecimalPlaces = 2;

  const ether = ethers.utils.formatEther(wei);
  const isRounded = ether.split(".")[1].length > etherDecimalPlaces;

  return <>{new Decimal(ether).toDP(etherDecimalPlaces).toFixed()}</>;
};

export default EtherFormatted;
