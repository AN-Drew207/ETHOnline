// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import { ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions, ISuperfluidToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { CFAv1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import { IConstantFlowAgreementV1 } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import { SuperAppBase } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

contract LendingPool is SuperAppBase {
    using SafeERC20 for ISuperToken;
    using CFAv1Library for CFAv1Library.InitData;

    CFAv1Library.InitData public cfaV1;
    ISuperfluid public host;
    IConstantFlowAgreementV1 public cfa;

    ISuperToken public token;

    constructor(ISuperToken _token, ISuperfluid _host) {
        token = _token;
        host = _host;

        cfa = IConstantFlowAgreementV1(
            address(host.getAgreementClass(keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")))
        );
        cfaV1 = CFAv1Library.InitData(host, cfa);
        uint256 configWord = SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

        _host.registerApp(configWord);
    }

    function createFlow(
        ISuperfluidToken token,
        address sender,
        address receiver,
        int96 flowRate
    ) public {
        cfaV1.createFlowByOperator(sender, receiver, token, flowRate);
    }

    function deleteFlow(
        ISuperfluidToken token,
        address sender,
        address receiver
    ) public {
        cfaV1.deleteFlowByOperator(sender, receiver, token);
    }

    /**
     * @dev superfluid callback. Check superfluid docs. only allows the depositor to
     * create a stream towards te contract. Because the dao must be the only depositor
     */
    function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId,
        bytes calldata, /*_agreementData*/
        bytes calldata cbdata,
        bytes calldata ctx
    ) external override returns (bytes memory newCtx) {}

    /**
     * @dev superfluid callback. Check superfluid docs
     */
    function afterAgreementUpdated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32 _agreementId,
        bytes calldata _agreementData,
        bytes calldata cbdata,
        bytes calldata ctx
    ) external override returns (bytes memory newCtx) {}

    /**
     * @dev superfluid callback. Check superfluid docs
     */
    function afterAgreementTerminated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32 _agreementId,
        bytes calldata _agreementData,
        bytes calldata cbdata,
        bytes calldata ctx
    ) external override returns (bytes memory newCtx) {}
}
