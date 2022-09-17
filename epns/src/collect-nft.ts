import {
  CollectNFTApproval as CollectNFTApprovalEvent,
  CollectNFTApprovalForAll as CollectNFTApprovalForAllEvent,
  CollectNFTTransfer as CollectNFTTransferEvent
} from "../generated/CollectNFT/CollectNFT"
import {
  CollectNFTApproval,
  CollectNFTApprovalForAll,
  CollectNFTTransfer
} from "../generated/schema"

export function handleCollectNFTApproval(event: CollectNFTApprovalEvent): void {
  let entity = new CollectNFTApproval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleCollectNFTApprovalForAll(
  event: CollectNFTApprovalForAllEvent
): void {
  let entity = new CollectNFTApprovalForAll(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleCollectNFTTransfer(event: CollectNFTTransferEvent): void {
  let entity = new CollectNFTTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}
