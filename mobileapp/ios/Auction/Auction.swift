import WidgetKit
import SwiftUI
import Intents

struct Provider: IntentTimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date())
  }
  
  func getSnapshot(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let entry = SimpleEntry(date: Date())
    completion(entry)
  }
  
  func getTimeline(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    var entries: [SimpleEntry] = []
    
    // Generate a timeline consisting of five entries an hour apart, starting from the current date.
    let currentDate = Date()
    for hourOffset in 0 ..< 5 {
      let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
      let entry = SimpleEntry(date: entryDate)
      entries.append(entry)
    }
    
    let timeline = Timeline(entries: entries, policy: .atEnd)
    completion(timeline)
  }
}

struct SimpleEntry: TimelineEntry {
  let date: Date
}

struct AuctionEntryView : View {
  var entry: Provider.Entry
  
  @Environment(\.colorScheme) var colorScheme
  
  var body: some View {
    VStack(alignment: .leading, spacing: 8) {
      HStack(alignment: .top, spacing: 8) {
        VStack(alignment: .center, spacing: 1) {
          Image("ImagePlaceholder")
            .resizable()
            .frame(width: 56, height: 56)
            .cornerRadius(8)
          Text("136")
            .font(.system(size: 14, weight: .bold))
        }
        
        VStack(alignment: .leading, spacing: 0) {
          Text("Current bid")
            .font(.system(size: 12))
          Text("0.0234")
            .font(.system(size: 18, weight: .black))
          HStack(alignment: .center, spacing: 3) {
            Image("ArrowCirclePath")
              .resizable()
              .frame(width: 10, height: 10)
            Text("22:11")
              .font(.system(size: 10))
              .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
          }
        }
        .padding(.top, 4)
      }
      
      VStack(alignment: .leading, spacing: 2) {
        Text("Auction ends in")
          .font(.system(size: 12))
        Text("7h 3m 36s")
          .font(.system(size: 18, weight: .black))
        ProgressBar(value: 12000, maxValue: 86400)
          .frame(height: 12)
          .padding(.top, 2)
      }
    }
    .padding(16)
    .foregroundColor(colorScheme == .light ? .black : .white)
  }
}

struct ProgressBar: View {
  var value: Double
  var maxValue: Double
  
  @Environment(\.colorScheme) var colorScheme
  
  var body: some View {
    let foregroundColor: Color = colorScheme == .light ? .black : .white
    let backgroundColor: Color = colorScheme == .light
    ? Color(red: 242/255, green: 242/255, blue: 242/255)
    : Color(red: 20/255, green: 20/255, blue: 20/255)
    
    GeometryReader { geometry in
      ZStack(alignment: .leading) {
        RoundedRectangle(cornerRadius: 69)
          .fill(backgroundColor)
        
        RoundedRectangle(cornerRadius: 69)
          .fill(foregroundColor)
          .frame(width: CGFloat(value / maxValue) * geometry.size.width)
      }
    }
  }
}

struct Auction: Widget {
  let kind: String = "Auction"
  
  var body: some WidgetConfiguration {
    IntentConfiguration(kind: kind, intent: SelectDAOIntent.self, provider: Provider()) { entry in
      AuctionEntryView(entry: entry)
    }
    .supportedFamilies([
      .systemSmall])
    .configurationDisplayName("Auction")
    .description("This widget displays the current auction state.")
  }
}

struct Auction_Previews: PreviewProvider {
  static var previews: some View {
    AuctionEntryView(entry: SimpleEntry(date: Date()))
      .previewContext(WidgetPreviewContext(family: .systemSmall))
  }
}
