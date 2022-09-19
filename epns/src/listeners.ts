// import { sendPaymentNotification } from "./epns";
import { getContracts } from "./utils";

export const subListener = () => {
    const contract = getContracts();
    contract.on("PayedSubscription", (targetAddress, ammount, event) => {
        console.log({
            to: targetAddress,
            quantity: ammount,
            data: event
        });
        // here goes sendNotification logic
    })
}
