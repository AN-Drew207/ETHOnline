import { useContext } from "react";
import XmtpContext from "components/XMTPProvider/context";

const useXMTP = () => {
  return useContext(XmtpContext);
};

export default useXMTP;
