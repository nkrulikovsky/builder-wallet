import Foundation
import Intents

struct DAOData: Codable {
  let name: String
  let address: String
}

class SelectDaoIntentData {
  private let appGroup = "group.com.nouns.ng.builder.daos"
  private let savedKey = "saved"
  
  func getSavedDAOs(completion: @escaping ([DAOData]) -> Void) {
    if let userDefaults = UserDefaults(suiteName: appGroup) {
      let jsonObject = userDefaults.value(forKey: savedKey) ?? []
      let jsonString = "\(jsonObject)"
      
      if let jsonData = jsonString.data(using: .utf8) {
        do {
          let daos = try JSONDecoder().decode([DAOData].self, from: jsonData)
  
          completion(daos)
        } catch {
          print("JSON Decoding Error: \(error)")
          completion([])
        }
      } else {
        print("Data conversion Error")
        completion([])
      }
    } else {
      print("UserDefaults Error")
      completion([])
    }
  }
}
