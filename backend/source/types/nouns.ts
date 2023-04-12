export interface Proposal {
  id: number
  title: string
  state: string
  endTime: number
  quorum?: number
  votes?: {
    yes: number
    no: number
    abstain: number
  }
}

export type Seed = {
  head: number
  glasses: number
  body: number
  accessory: number
  background: number
}

export interface Auction {
  id: number
  currentBid: String
  bidder: String
  endTime: number
  image: String
  seed: Seed
}

export interface Nouns {
  auction: Auction
  proposals?: Proposal[]
}
