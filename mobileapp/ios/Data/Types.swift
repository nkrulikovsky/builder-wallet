import Foundation

struct WidgetData {
  let auction: AuctionData?
  let governance: [ProposalData]?
}

struct AuctionData {
  let id: Int
  let currentBid: Double
  let bidder: String
  let endTime: Int
  let image: Data
  let duration: Int
}

struct ProposalData {
  let id: String
  let number: Int
  let title: String
  let state: String
  let endTime: Double
  let quorum: Int
  let votes: ProposalVotes?
}

struct ProposalVotes {
  let yes: Int
  let no: Int
  let abstain: Int
}
