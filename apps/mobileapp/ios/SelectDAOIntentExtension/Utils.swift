import Foundation

func shortAddress(_ address: String) -> String? {
    guard !address.isEmpty else { return nil }
    return address.prefix(6) + "..." + address.suffix(6)
}
