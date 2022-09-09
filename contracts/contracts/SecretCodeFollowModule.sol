pragma solidity 0.8.10;

import { IFollowModule } from "@aave/lens-protocol/contracts/interfaces/IFollowModule.sol";
import { ModuleBase } from "@aave/lens-protocol/contracts/core/modules/ModuleBase.sol";
import { FollowValidatorFollowModuleBase } from "@aave/lens-protocol/contracts/core/modules/follow/FollowValidatorFollowModuleBase.sol";
import {ISuperfluidToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";
import { IMoneyRouter } from "./interfaces/IMoneyRouter.sol";
contract SecretCodeFollowModule is IFollowModule, FollowValidatorFollowModuleBase {
    error PasscodeInvalid();
    ISuperfluidToken superToken;
    IMoneyRouter moneyRouter;
    mapping(uint256 => uint256) internal _passcodeByProfile;

    constructor(
        address hub,
        IMoneyRouter _moneyRouter,
        ISuperfluidToken _superToken
    ) ModuleBase(hub) {
        moneyRouter = _moneyRouter;
        superToken = _superToken;
    }

    function initializeFollowModule(uint256 profileId, bytes calldata data)
        external
        override
        onlyHub
        returns (bytes memory)
    {
        uint256 passcode = abi.decode(data, (uint256));
        _passcodeByProfile[profileId] = passcode;
        return data;
    }

    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external override {
        int96 passcode = abi.decode(data, (int96));
        moneyRouter.createFlowFromContract(superToken, address(this), passcode);
        // if (passcode != _passcodeByProfile[profileId]) revert PasscodeInvalid();
    }

    function followModuleTransferHook(
        uint256 profileId,
        address from,
        address to,
        uint256 followNFTTokenId
    ) external override {}
}