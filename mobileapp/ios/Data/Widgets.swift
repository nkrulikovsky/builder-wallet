import Foundation
import Alamofire

class WidgetDataLoader {
  private let baseApiUrl = "https://api.builderwidgets.wtf/dao/"
  
  func fetchImageData(daoAddress: String, completion: @escaping (Data?) -> Void) {
    let url = "\(baseApiUrl)\(daoAddress)?data=auction"
    
    AF.request(url).responseJSON { response in
      if let json = response.value as? [String: Any],
         let daoInfo = json["auction"] as? [String: Any],
         let base64Image = daoInfo["image"] as? String,
         let imageData = Data(base64Encoded: base64Image) {
        completion(imageData)
      } else {
        completion(nil)
      }
    }
  }
  
  func fetchAuctionData(daoAddress: String, completion: @escaping (AuctionData?) -> Void) {
    let url = "\(baseApiUrl)\(daoAddress)?data=auction"
    
    AF.request(url).responseJSON { response in
      if let json = response.value as? [String: Any],
         let daoInfo = json["auction"] as? [String: Any],
         let id = daoInfo["id"] as? Int,
         let currentBid = daoInfo["amount"] as? Double,
         let bidder = daoInfo["bidder"] as? String,
         let endTime = daoInfo["endTime"] as? Int,
         let duration = daoInfo["duration"] as? Int,
         let base64Image = daoInfo["image"] as? String,
         let imageData = Data(base64Encoded: base64Image) {
        
        let data = AuctionData(
          id: id,
          currentBid: currentBid,
          bidder: bidder,
          endTime: endTime,
          image: imageData,
          duration: duration
        )
        
        completion(data)
      } else {
        completion(nil)
      }
    }
  }
  
  func fetchAuctionAndGovernanceData(daoAddress: String, completion: @escaping (WidgetData?) -> Void) {
    let url = "\(baseApiUrl)\(daoAddress)?data=auction,governance"
    
    AF.request(url).responseJSON { response in
      if let json = response.value as? [String: Any],
         let daoInfo = json["auction"] as? [String: Any],
         let id = daoInfo["id"] as? Int,
         let currentBid = daoInfo["amount"] as? Double,
         let bidder = daoInfo["bidder"] as? String,
         let endTime = daoInfo["endTime"] as? Int,
         let duration = daoInfo["duration"] as? Int,
         let base64Image = daoInfo["image"] as? String,
         let imageData = Data(base64Encoded: base64Image) {
        
        let gov: [ProposalData] = [
          ProposalData(id: "0x1", number: 1, title: "Removing the Founder Allocation for the Founder multisig", state: "ACTIVE", endTime: 1683645241, quorum: 18, votes: ProposalVotes(yes: 20, no: 0, abstain: 0)),
          ProposalData(id: "0x1", number: 1, title: "Removing the Founder Allocation for the Founder multisig", state: "ACTIVE", endTime: 1683645241, quorum: 18, votes: ProposalVotes(yes: 20, no: 0, abstain: 0)),
          ProposalData(id: "0x2", number: 2, title: "Extend Deadline for Hub issues Funding", state: "ACTIVE", endTime: 1683789333, quorum: 18, votes: ProposalVotes(yes: 12, no: 6, abstain: 6)),
          ProposalData(id: "0x2", number: 2, title: "Extend Deadline for Hub issues Funding", state: "ACTIVE", endTime: 1683789333, quorum: 18, votes: ProposalVotes(yes: 12, no: 6, abstain: 6)),
          ProposalData(id: "0x2", number: 2, title: "Extend Deadline for Hub issues Funding", state: "ACTIVE", endTime: 1683789333, quorum: 18, votes: ProposalVotes(yes: 12, no: 6, abstain: 6)),
          ProposalData(id: "0x2", number: 2, title: "Extend Deadline for Hub issues Funding", state: "ACTIVE", endTime: 1683789333, quorum: 18, votes: ProposalVotes(yes: 12, no: 6, abstain: 6)),
          ProposalData(id: "0x3", number: 3, title: "Sponsor the Forefront Newsletter", state: "PENDING", endTime: 1683789333, quorum: 18, votes: nil),
          ProposalData(id: "0x3", number: 3, title: "Sponsor the Forefront Newsletter", state: "PENDING", endTime: 1683789333, quorum: 18, votes: nil)
        ]
        
        let data = WidgetData(
          auction: AuctionData(
            id: id,
            currentBid: currentBid,
            bidder: bidder,
            endTime: endTime,
            image: imageData,
            duration: duration
          ),
          governance: gov
        )
        
        completion(data)
      } else {
        completion(nil)
      }
    }
  }
}
