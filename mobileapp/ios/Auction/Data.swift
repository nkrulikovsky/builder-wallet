import Foundation
import Alamofire

struct AuctionData {
  let id: Int
  let currentBid: Double
  let endTime: Int
  let image: Data
  let duration: Int
}

class AuctionDataLoader {
  private let baseApiUrl = "https://api.builderwidgets.wtf/dao/"
  private let dataParam = "?data=auction"
  
  func fetchAuctionData(daoAddress: String, completion: @escaping (AuctionData?) -> Void) {
    let url = "\(baseApiUrl)\(daoAddress)\(dataParam)"
    
    AF.request(url).responseJSON { response in
      if let json = response.value as? [String: Any],
         let daoInfo = json["auction"] as? [String: Any],
         let id = daoInfo["id"] as? Int,
         let currentBid = daoInfo["amount"] as? Double,
         let endTime = daoInfo["endTime"] as? Int,
         let duration = daoInfo["duration"] as? Int,
         let base64Image = daoInfo["image"] as? String,
         let imageData = Data(base64Encoded: base64Image) {
        
        let data: AuctionData = AuctionData(
          id: id,
          currentBid: currentBid,
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
}

extension Double {
  func secondsToDhms() -> String {
    let totalSeconds = Int(self)
    let d = totalSeconds / (3600 * 24)
    let h = (totalSeconds % (3600 * 24)) / 3600
    let m = (totalSeconds % 3600) / 60
    let s = totalSeconds % 60
    
    let dDisplay = d > 0 ? "\(d)d " : ""
    let hDisplay = h > 0 ? "\(h)h " : ""
    let mDisplay = m > 0 ? "\(m)m " : ""
    let sDisplay = "\(s)s"
    
    return dDisplay + hDisplay + mDisplay + sDisplay
  }
}
