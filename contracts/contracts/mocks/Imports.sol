// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import { FollowNFT } from "@aave/lens-protocol/contracts/core/FollowNFT.sol";
import { LensHub } from "@aave/lens-protocol/contracts/core/LensHub.sol";
import { CollectNFT } from "@aave/lens-protocol/contracts/core/CollectNFT.sol";
import { ApprovalFollowModule } from "@aave/lens-protocol/contracts/core/modules/follow/ApprovalFollowModule.sol";
import { FeeFollowModule } from "@aave/lens-protocol/contracts/core/modules/follow/FeeFollowModule.sol";
import { ProfileFollowModule } from "@aave/lens-protocol/contracts/core/modules/follow/ProfileFollowModule.sol";
import { RevertFollowModule } from "@aave/lens-protocol/contracts/core/modules/follow/RevertFollowModule.sol";
import { FollowerOnlyReferenceModule } from "@aave/lens-protocol/contracts/core/modules/reference/FollowerOnlyReferenceModule.sol";
import { FreeCollectModule } from "@aave/lens-protocol/contracts/core/modules/collect/FreeCollectModule.sol";
import { LimitedFeeCollectModule } from "@aave/lens-protocol/contracts/core/modules/collect/LimitedFeeCollectModule.sol";
import { LimitedTimedFeeCollectModule } from "@aave/lens-protocol/contracts/core/modules/collect/LimitedTimedFeeCollectModule.sol";
import { TimedFeeCollectModule } from "@aave/lens-protocol/contracts/core/modules/collect/TimedFeeCollectModule.sol";
import { FeeCollectModule } from "@aave/lens-protocol/contracts/core/modules/collect/FeeCollectModule.sol";
import { RevertCollectModule } from "@aave/lens-protocol/contracts/core/modules/collect/RevertCollectModule.sol";
import { ModuleGlobals } from "@aave/lens-protocol/contracts/core/modules/ModuleGlobals.sol";
import { InteractionLogic } from "@aave/lens-protocol/contracts/libraries/InteractionLogic.sol";
import { PublishingLogic } from "@aave/lens-protocol/contracts/libraries/PublishingLogic.sol";
import { ProfileTokenURILogic } from "@aave/lens-protocol/contracts/libraries/ProfileTokenURILogic.sol";
import { TransparentUpgradeableProxy } from "@aave/lens-protocol/contracts/upgradeability/TransparentUpgradeableProxy.sol";
import { LensPeriphery } from "@aave/lens-protocol/contracts/misc/LensPeriphery.sol";
import { UIDataProvider } from "@aave/lens-protocol/contracts/misc/UIDataProvider.sol";
import { ProfileCreationProxy } from "@aave/lens-protocol/contracts/misc/ProfileCreationProxy.sol";

contract Imports {
    //to make available types from packages
}
