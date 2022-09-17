import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CollectNFTApproval,
  CollectNFTApprovalForAll,
  CollectNFTTransfer
} from "../generated/CollectNFT/CollectNFT"

export function createCollectNFTApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): CollectNFTApproval {
  let collectNftApprovalEvent = changetype<CollectNFTApproval>(newMockEvent())

  collectNftApprovalEvent.parameters = new Array()

  collectNftApprovalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  collectNftApprovalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  collectNftApprovalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return collectNftApprovalEvent
}

export function createCollectNFTApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): CollectNFTApprovalForAll {
  let collectNftApprovalForAllEvent = changetype<CollectNFTApprovalForAll>(
    newMockEvent()
  )

  collectNftApprovalForAllEvent.parameters = new Array()

  collectNftApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  collectNftApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  collectNftApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return collectNftApprovalForAllEvent
}

export function createCollectNFTTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): CollectNFTTransfer {
  let collectNftTransferEvent = changetype<CollectNFTTransfer>(newMockEvent())

  collectNftTransferEvent.parameters = new Array()

  collectNftTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  collectNftTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  collectNftTransferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return collectNftTransferEvent
}
