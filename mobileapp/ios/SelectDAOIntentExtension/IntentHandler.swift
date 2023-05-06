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
      var daoOptions = daos.map { dao in
        let daoOption = DAO(
          identifier: dao.address,
          display: dao.name,
          subtitle: dao.address,
          image: nil
        )
        
        return daoOption
      }
      
      if ((searchTerm) != nil) {
        daoOptions = daoOptions.filter { dao in
          dao.displayString.contains(searchTerm!)
        }
      }
      
      let collection = INObjectCollection(items: daoOptions)
      completion(collection, nil)
    }
  }
}
