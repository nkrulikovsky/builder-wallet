import Intents

class DAOOption: INObject {
    var displayName: String

    init(identifier: String, display: String) {
        self.displayName = display
        super.init(identifier: identifier, display: display, subtitle: nil, image: nil)
    }

    required init?(coder: NSCoder) {
        guard let displayName = coder.decodeObject(forKey: "displayName") as? String else { return nil }
        self.displayName = displayName
        super.init(coder: coder)
    }

    override func encode(with coder: NSCoder) {
        super.encode(with: coder)
        coder.encode(displayName, forKey: "displayName")
    }
}
