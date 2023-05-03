import Foundation
import Alamofire

class WidgetDataLoader {
    private let baseApiUrl = "https://api.builderwidgets.wtf/dao/"
    private let dataParam = "?data=auction"

    func fetchImageData(daoAddress: String, completion: @escaping (Data?) -> Void) {
        let url = "\(baseApiUrl)\(daoAddress)\(dataParam)"
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
}
