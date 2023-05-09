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
