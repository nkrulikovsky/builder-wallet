import Foundation
import Alamofire
import SwiftyUserDefaults

struct DAOData: Codable {
    let name: String
    let address: String
}

class WidgetDataLoader {
    private let appGroup = "com.nouns.ng.builder.daos"
    private let savedKey = "saved"
    private let baseApiUrl = "https://api.builderwidgets.wtf/dao/"
    private let dataParam = "?data=auction"

    func getSavedDAOs(completion: @escaping ([DAOData]) -> Void) {
        if let userDefaults = UserDefaults(suiteName: appGroup) {
            let jsonString = userDefaults.string(forKey: savedKey) ?? "[]"
            if let jsonData = jsonString.data(using: .utf8),
               let daos = try? JSONDecoder().decode([DAOData].self, from: jsonData) {
              print(daos)
                completion(daos)
            } else {
              print("empty daos 2")
                completion([])
            }
        } else {
          print("empty daos 2")
            completion([])
        }
    }

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

