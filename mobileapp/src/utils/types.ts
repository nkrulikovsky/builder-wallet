export type CurrentAuction = {
  id: string
  endTime: number
  highestBid: string
  highestBidder: `0x${string}`
}

export type DAO = {
  address: string
  name: string
  metadata: string
  auction: CurrentAuction
}

export type Proposal = {
  proposalId: string
  proposalNumber: number
  status: string
  title: string
  voteEnd: number
  voteStart: number
  abstainVotes: number
  againstVotes: number
  forVotes: number
  quorumVotes: number
  executableFrom?: number
  expiresAt?: number
  executed: boolean
  canceled: boolean
  votes: Vote[]
  dao: {
    tokenAddress: string
  }
}

export type Vote = {
  voter: string
  support: string
}

export type BuilderDAOsPropsResponse = {
  proposals: Proposal[]
}
