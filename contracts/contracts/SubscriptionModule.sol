// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import { IFollowModule } from "@aave/lens-protocol/contracts/interfaces/IFollowModule.sol";
import { ILensHub } from "@aave/lens-protocol/contracts/interfaces/ILensHub.sol";
import { IModuleGlobals } from "@aave/lens-protocol/contracts/interfaces/IModuleGlobals.sol";
import { Errors } from "@aave/lens-protocol/contracts/libraries/Errors.sol";
import { Events } from "@aave/lens-protocol/contracts/libraries/Events.sol";
import { FeeModuleBase } from "@aave/lens-protocol/contracts/core/modules/FeeModuleBase.sol";
import { ModuleBase } from "@aave/lens-protocol/contracts/core/modules/ModuleBase.sol";
import { FollowValidatorFollowModuleBase } from "@aave/lens-protocol/contracts/core/modules/follow/FollowValidatorFollowModuleBase.sol";

import { ISuperfluidToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import { ITransferManager } from "./interfaces/ITransferManager.sol";
import { IMoneyRouter } from "./interfaces/IMoneyRouter.sol";

import {ISuperfluidToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";


struct ProfileData {
    address currency;
    int96 flowRate;
    address recipient;
}

contract SubscriptionModule is IFollowModule, FollowValidatorFollowModuleBase {
    ISuperfluidToken superToken;
    using SafeERC20 for IERC20;
    uint16 internal constant BPS_MAX = 10000;
    address public immutable MODULE_GLOBALS;
    ITransferManager transferManager;
    IMoneyRouter moneyRouter;
    mapping(uint256 => ProfileData) internal _dataByProfile;

    constructor(
        // ITransferManager _transferManager,
        IMoneyRouter _moneyRouter,
        ISuperfluidToken _superToken,
        address hub,
        address moduleGlobals
    ) ModuleBase(hub) {
        // transferManager = _transferManager;
        moneyRouter = _moneyRouter;
        superToken = _superToken;
        if (moduleGlobals == address(0)) revert Errors.InitParamsInvalid();
        MODULE_GLOBALS = moduleGlobals;

        emit Events.FeeModuleBaseConstructed(moduleGlobals, block.timestamp);
    }

    function _currencyWhitelisted(address currency) internal view returns (bool) {
        return IModuleGlobals(MODULE_GLOBALS).isCurrencyWhitelisted(currency);
    }

    function _treasuryData() internal view returns (address, uint16) {
        return IModuleGlobals(MODULE_GLOBALS).getTreasuryData();
    }

    function _validateDataIsExpected(
        bytes calldata data,
        address currency,
        int96 flowRate
    ) internal pure {
        (address decodedCurrency, int96 decodedAmount) = abi.decode(data, (address, int96));
        if (decodedAmount != flowRate || decodedCurrency != currency) revert Errors.ModuleDataMismatch();
    }

    function initializeFollowModule(uint256 profileId, bytes calldata data)
        external
        override
        onlyHub
        returns (bytes memory)
    {
        (int96 flowRate, address currency, address recipient) = abi.decode(data, (int96, address, address));
        if (!_currencyWhitelisted(currency) || recipient == address(0) || flowRate == 0)
            revert Errors.InitParamsInvalid();

        _dataByProfile[profileId].flowRate = flowRate;
        _dataByProfile[profileId].currency = currency;
        _dataByProfile[profileId].recipient = recipient;
        return data;
    }

    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external override onlyHub {
        int96 flowRate = _dataByProfile[profileId].flowRate;
        address currency = _dataByProfile[profileId].currency;
        _validateDataIsExpected(data, currency, flowRate);
        address recipient = _dataByProfile[profileId].recipient;

        uint256 passcode = abi.decode(data, (uint256));
        moneyRouter.createFlowFromContract(superToken, address(this), flowRate);
    }

    function followModuleTransferHook(
        uint256 profileId,
        address from,
        address to,
        uint256 followNFTTokenId
    ) external override {}

    function getProfileData(uint256 profileId) external view returns (ProfileData memory) {
        return _dataByProfile[profileId];
    }
}
