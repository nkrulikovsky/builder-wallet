import Intents

class IntentHandler: INExtension, SelectDAOIntentHandling {
  let intentData = SelectDaoIntentData()
  
  override func handler(for intent: INIntent) -> Any {
    // This is the default implementation.  If you want different objects to handle different intents,
    // you can override this and return the handler you want for that particular intent.
    return self
  }
  
  func provideDaoOptionsCollection(for intent: SelectDAOIntent, searchTerm: String?, with completion: @escaping (INObjectCollection<DAO>?, Error?) -> Void) {
    intentData.getSavedDAOs { daos in
      let daoOptions = daos.map { dao in
        let daoOption = DAO(
          identifier: dao.address,
          display: dao.name
        )
//          .init(
//            identifier: "1",
//            display: "SoupPay Credit",
//            subtitle: "$248.20",
//            image: nil
//          ),
        
        return daoOption
      }
      
      let collection = INObjectCollection(items: daoOptions)
      completion(collection, nil)
    }
  }
}
