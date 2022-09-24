// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "hardhat/console.sol";
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

struct ProfileData {
    address currency;
    int96 flowRate;
    address recipient;
}

contract SubscriptionModule is FollowValidatorFollowModuleBase {
    using SafeERC20 for IERC20;

    uint16 internal constant BPS_MAX = 10000;
    address public immutable MODULE_GLOBALS;
    ITransferManager transferManager;

    mapping(uint256 => ProfileData) internal _dataByProfile;

    event PayedSubscription(address reciever, int96 ammount);

    constructor(
        ITransferManager _transferManager,
        address hub,
        address moduleGlobals
    ) ModuleBase(hub) {
        transferManager = _transferManager;
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
        address recipient = _dataByProfile[profileId].recipient;

        transferManager.createFlow(ISuperfluidToken(currency), follower, recipient, flowRate);
        emit PayedSubscription(recipient, flowRate);
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
