import { ProposalSubgraphEntity } from '../types/shared'

export const getProposalState = (
  blockNumber: number,
  proposal: ProposalSubgraphEntity
) => {
  const status = proposal.status
  if (status === 'PENDING') {
    if (blockNumber <= parseInt(proposal.startBlock)) {
      return 'PENDING'
    }
    return 'ACTIVE'
  }
  if (status === 'ACTIVE') {
    if (blockNumber > parseInt(proposal.endBlock)) {
      return null
    }
    return 'ACTIVE'
  }
  return null
}

export const getProposalTitle = (proposal: ProposalSubgraphEntity) => {
  const titleEnd = proposal.description.indexOf('\n\n')

  return proposal.description.substring(2, titleEnd)
}

export const getProposalEndTimestamp = (
  blockNumber: number,
  state: string,
  proposal: ProposalSubgraphEntity
) => {
  let blocksToGo
  if (state === 'ACTIVE') {
    blocksToGo = parseInt(proposal.endBlock) - blockNumber
  } else {
    blocksToGo = parseInt(proposal.startBlock) - blockNumber
  }

  return Date.now() + blocksToGo * 12 * 1000
}
