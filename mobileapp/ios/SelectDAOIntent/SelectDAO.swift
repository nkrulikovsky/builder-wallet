//import Intents
////import Art
//
//class SelectDAOIntentHandler: NSObject, SelectDAOIntentHandling {
//  func handler(for intent: INIntent) -> Any? {
//    if intent is SelectDAOIntent {
//      return self
//    }
//    return nil
//  }
//
//  let widgetDataLoader = WidgetDataLoader()
//
//  func provideDAOOptionsCollection(for intent: SelectDAOIntent, with completion: @escaping (INObjectCollection<INObject>?, Error?) -> Void) {
//      widgetDataLoader.getSavedDAOs { daos in
//          let daoOptions = daos.map { dao -> INObject in
//              let identifier = dao.address
//              let displayName = dao.name
//              let daoOption = INObject(identifier: identifier, display: displayName)
//              return daoOption
//          }
//          let collection = INObjectCollection(items: daoOptions)
//          completion(collection, nil)
//      }
//  }
//
//
//  func defaultDAO(for intent: SelectDAOIntent) -> INObject? {
//      return INObject(identifier: "Select DAO", display: "Select DAO")
//  }
//}
