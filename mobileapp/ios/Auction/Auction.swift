import WidgetKit
import SwiftUI
import Intents

struct Provider: IntentTimelineProvider {
  let dataLoader = WidgetDataLoader()
  
  func placeholder(in context: Context) -> SimpleEntry {
    return SimpleEntry(
      date: Date(),
      id: 136,
      currentBid: 0.1234,
      endTime: 0,
      image: UIImage(named: "ImagePlaceholder")!.pngData()!,
      duration: 86400,
      state: .success
    )
  }
  
  func getSnapshot(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let address = configuration.dao?.identifier
    
    if let address = address {
      dataLoader.fetchAuctionData(daoAddress: address) { auction in
        if auction != nil, let imageData = auction?.image, let image = UIImage(data: imageData) {
          let entry = SimpleEntry(
            date: Date(),
            id: auction?.id,
            currentBid: auction?.currentBid,
            endTime: auction?.endTime,
            image: image.pngData(),
            duration: auction?.duration,
            state: .success
          )
          
          completion(entry)
        } else {
          let entry = SimpleEntry(
            date: Date(),
            id: nil,
            currentBid: nil,
            endTime: nil,
            image: nil,
            duration: nil,
            state: .error
          )
          
          completion(entry)
        }
      }
    } else {
      let entry = SimpleEntry(
        date: Date(),
        id: nil,
        currentBid: nil,
        endTime: nil,
        image: nil,
        duration: nil,
        state: .noDao
      )
      
      completion(entry)
    }
  }
  
  func getTimeline(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    let address = configuration.dao?.identifier
    
    if let address = address {
      dataLoader.fetchAuctionData(daoAddress: address) { auction in
        if auction != nil, let imageData = auction?.image, let image = UIImage(data: imageData) {
          let entry = SimpleEntry(
            date: Date(),
            id: auction?.id,
            currentBid: auction?.currentBid,
            endTime: auction?.endTime,
            image: image.pngData(),
            duration: auction?.duration,
            state: .success
          )
          
          let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
          let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
          completion(timeline)
        } else {
          let entry = SimpleEntry(
            date: Date(),
            id: nil,
            currentBid: nil,
            endTime: nil,
            image: nil,
            duration: nil,
            state: .error
          )
          
          let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
          let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
          completion(timeline)
        }
      }
    } else {
      let entry = SimpleEntry(
        date: Date(),
        id: nil,
        currentBid: nil,
        endTime: nil,
        image: nil,
        duration: nil,
        state: .noDao
      )
      
      let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
      let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
      completion(timeline)
    }
  }
}

enum WidgetState {
  case success, error, noDao
}

struct SimpleEntry: TimelineEntry {
  let date: Date
  let id: Int?
  let currentBid: Double?
  let endTime: Int?
  let image: Data?
  let duration: Int?
  let state: WidgetState
}

struct AuctionEntryView : View {
  var entry: Provider.Entry
  
  @Environment(\.colorScheme) var colorScheme
  
  var body: some View {
    switch entry.state {
    case .success:
      let timeToGo = max(0, Double(entry.endTime!) - Date().timeIntervalSince1970)
      
      VStack(alignment: .leading, spacing: 8) {
        HStack(alignment: .top, spacing: 8) {
          VStack(alignment: .center, spacing: 1) {
            Image(uiImage: UIImage(data: entry.image!)!)
              .resizable()
              .frame(width: 52, height: 52)
              .cornerRadius(8)
            Text(String(entry.id!))
              .font(.system(size: 12, weight: .bold))
          }
          
          VStack(alignment: .leading, spacing: 0) {
            Text(timeToGo == 0 ? "Winning bid" : "Current bid")
              .font(.system(size: 12))
            Text("\(String(entry.currentBid!)) Ξ")
              .font(.system(size: 18, weight: .black))
            HStack(alignment: .center, spacing: 2) {
              Image("ArrowCirclePath")
                .resizable()
                .frame(width: 10, height: 10)
              Text(entry.date, style: .time)
                .font(.system(size: 10))
                .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
            }
          }
          .padding(.top, 2)
        }
        
        VStack(alignment: .leading, spacing: 2) {
          Text("Auction ends in")
            .font(.system(size: 12))
          Text(timeToGo == 0 ? "Ended" : timeToGo.secondsToDhms())
            .font(.system(size: 18, weight: .black))
          ProgressBar(value: timeToGo, maxValue: Double(entry.duration!))
            .frame(height: 8)
            .padding(.top, 2)
        }
      }
      .padding(16)
      .foregroundColor(colorScheme == .light ? .black : .white)
    case .error:
      VStack {
        Image(systemName: "xmark.octagon").padding(.bottom, 1)
        Text("Error happened")
      }
      .foregroundColor(colorScheme == .light ? .black : .white)
    case .noDao:
      VStack {
        Image(systemName: "exclamationmark.triangle").padding(.bottom, 1)
        Text("Select DAO")
      }
      .foregroundColor(colorScheme == .light ? .black : .white)
    }
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
