import * as EpnsAPI from "@epnsproject/sdk-restapi";
import * as ethers from "ethers";
import { getPrivateKey } from "./utils";

const pk = getPrivateKey();
const signer = new ethers.Wallet(pk);

export const sendNotification = async() => {
    try {
        const apiResponse = await EpnsAPI.payloads.sendNotification({
            signer,
            type: 3, // target
            identityType: 2, // direct payload,
            notification: {
                title: `[SDK-TEST] notification TITLE:`,
                body: `[sdk-test] notification BODY`
              },
            payload: {
                title: `[sdk-test] payload title`,
                body: `sample msg body`,
                cta: '',
                img: ''
              },
            recipients: 'eip155:42:0xd29BC939ACF8269938557A27949b228EEf478479', // recipient address
            channel: 'eip155:42:0x80d0bcfb103bD2B03cba953D394c6cb308F13335', // your channel address
            env: 'staging'
        });
      
      // apiResponse?.status === 204, if sent successfully!
      console.log('API repsonse: ', apiResponse);
    } catch (err) {
      console.error('Error: ', err);
    }
};