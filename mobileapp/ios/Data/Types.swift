import Foundation

struct WidgetData {
  let auction: AuctionData
}

struct AuctionData {
  let id: Int
  let currentBid: Double
  let bidder: String
  let endTime: Int
  let image: Data
  let duration: Int
}
