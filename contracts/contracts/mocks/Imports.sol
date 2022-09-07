// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@aave/lens-protocol/contracts/core/FollowNFT.sol";
import "@aave/lens-protocol/contracts/core/LensHub.sol";
import "@aave/lens-protocol/contracts/core/CollectNFT.sol";
import "@aave/lens-protocol/contracts/core/modules/follow/ApprovalFollowModule.sol";
import "@aave/lens-protocol/contracts/core/modules/follow/FeeFollowModule.sol";
import "@aave/lens-protocol/contracts/core/modules/follow/ProfileFollowModule.sol";
import "@aave/lens-protocol/contracts/core/modules/follow/RevertFollowModule.sol";
import "@aave/lens-protocol/contracts/core/modules/reference/FollowerOnlyReferenceModule.sol";
import "@aave/lens-protocol/contracts/core/modules/collect/FreeCollectModule.sol";
import "@aave/lens-protocol/contracts/core/modules/collect/LimitedFeeCollectModule.sol";
//import "@aave/lens-protocol/contracts/core/modules/collect/FeeCollectModule.sol";
import "@aave/lens-protocol/contracts/core/modules/collect/RevertCollectModule.sol";
import "@aave/lens-protocol/contracts/core/modules/ModuleGlobals.sol";
import "@aave/lens-protocol/contracts/libraries/InteractionLogic.sol";
import "@aave/lens-protocol/contracts/libraries/PublishingLogic.sol";
import "@aave/lens-protocol/contracts/libraries/ProfileTokenURILogic.sol";
import "@aave/lens-protocol/contracts/upgradeability/TransparentUpgradeableProxy.sol";
import "@aave/lens-protocol/contracts/misc/LensPeriphery.sol";
import "@aave/lens-protocol/contracts/misc/UIDataProvider.sol";
import "@aave/lens-protocol/contracts/misc/ProfileCreationProxy.sol";

contract Imports {
    //to make available types from packages
}
