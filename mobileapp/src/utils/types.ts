export type CurrentAuction = {
  token: {
    name: string
    image: string
    tokenId: string
  }
  endTime: number
  highestBid?: {
    amount: string
    bidder: string
  }
}

export type DAO = {
  address: string
  name: string
  // metadata: string
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

export type BuilderDAOsAuctionResponse = {
  auctions: {
    token: {
      name: string
      image: string
      tokenId: string
    }
    endTime: number
    highestBid: {
      amount: string
      bidder: string
    }
  }[]
  auctionConfig: {
    duration: string
  }
}

export type DaoSearchPropsResponse = {
  daos: {
    name: string
    tokenAddress: string
  }[]
}
