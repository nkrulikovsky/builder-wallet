export type CurrentAuction = {
  id: string
  endTime: number
  highestBid: string
}

export type DAO = {
  address: string
  name: string
  metadata: string
  auction: CurrentAuction
}

export type Proposal = {
  collectionAddress: string
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
  votes: Vote[]
}

export type Vote = {
  voter: string
  support: string
}

export type BuilderDAOsPropsResponse = {
  nouns: {
    nounsProposals: {
      nodes: Proposal[]
    }
  }
}
