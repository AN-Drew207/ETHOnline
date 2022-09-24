// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import { ISuperfluidToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

interface ITransferManager {
    function createFlow(
        ISuperfluidToken token,
        address sender,
        address receiver,
        int96 flowRate
    ) external;

    function deleteFlow(
        ISuperfluidToken token,
        address sender,
        address receiver
    ) external;
}
