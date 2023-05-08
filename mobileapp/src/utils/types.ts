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
