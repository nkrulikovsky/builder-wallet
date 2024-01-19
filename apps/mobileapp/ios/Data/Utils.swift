import Foundation

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
