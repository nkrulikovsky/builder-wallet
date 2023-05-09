import WidgetKit
import SwiftUI

struct Provider: IntentTimelineProvider {
  let dataLoader = WidgetDataLoader()
  
  func placeholder(in context: Context) -> SimpleEntry {
    return SimpleEntry(
      date: Date(),
      auction: AuctionData(
        id: 136,
        currentBid: 0.1234,
        bidder: "0xf1...5b42",
        endTime: 0,
        image: UIImage(named: "ImagePlaceholder")!.pngData()!,
        duration: 86400
      ),
      state: .success
    )
  }
  
  func getSnapshot(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let address = configuration.dao?.identifier
    
    if let address = address {
      dataLoader.fetchAuctionAndGovernanceData(daoAddress: address) { data in
        if data?.auction != nil {
          let entry = SimpleEntry(date: Date(),auction: data?.auction, state: .success)
          completion(entry)
        } else {
          let entry = SimpleEntry(date: Date(), auction: nil, state: .noDao)
          completion(entry)
        }
      }
    } else {
      let entry = SimpleEntry(date: Date(), auction: nil, state: .noDao)
      completion(entry)
    }
  }
  
  func getTimeline(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    let address = configuration.dao?.identifier
    
    if let address = address {
      dataLoader.fetchAuctionAndGovernanceData(daoAddress: address) { data in
        if data?.auction != nil {
          let entry = SimpleEntry(date: Date(),auction: data?.auction, state: .success)
          let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
          let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
          completion(timeline)
        } else {
          let entry = SimpleEntry(date: Date(), auction: nil, state: .noDao)
          let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
          let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
          completion(timeline)
        }
      }
    } else {
      let entry = SimpleEntry(date: Date(), auction: nil, state: .noDao)
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
  let auction: AuctionData?
  let state: WidgetState
}

struct AuctionGovernanceEntryView : View {
  var entry: Provider.Entry
  
  @Environment(\.widgetFamily) var widgetFamily
  @Environment(\.colorScheme) var colorScheme
  
  var body: some View {
    switch entry.state {
    case .success:
      let timeToGo = max(0, Double(entry.auction!.endTime) - Date().timeIntervalSince1970)
      
      VStack(alignment: .leading, spacing: 2) {
        HStack(alignment: .top, spacing: 16) {
          VStack(alignment: .center, spacing: 1) {
            Image(uiImage: UIImage(data: entry.auction!.image)!)
              .resizable()
              .frame(width: 56, height: 56)
              .cornerRadius(8)
            Text(String(entry.auction!.id))
              .font(.system(size: 12, weight: .bold))
          }
          
          VStack(alignment: .leading, spacing: 0) {
            Text("Auction ends in")
              .font(.system(size: 12))
            Text(timeToGo == 0 ? "Ended" : timeToGo.secondsToDhms())
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
          .padding(.top, 4)
          .frame(width: 122, alignment: .topLeading)
          
          VStack(alignment: .leading, spacing: 0) {
            Text(timeToGo == 0 ? "Winning bid" : "Current bid")
              .font(.system(size: 12))
            Text("\(String(entry.auction!.currentBid)) Ξ")
              .font(.system(size: 18, weight: .black))
            Text("by: \(entry.auction!.bidder)")
              .font(.system(size: 10))
              .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
          }
          .padding(.top, 4)
          
          Spacer(minLength: 0)
        }
        
        HStack(alignment: .center, spacing: 0) {
          Text("Active Proposals")
            .font(.system(size: 12))
            .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
          VStack {
            Divider().background(Color(red: 0.8, green: 0.8, blue: 0.8))
          }
          .padding(.leading, 4)
        }
        
        VStack(alignment: .leading, spacing: 2) {
          HStack(alignment: .center, spacing: 4) {
            ZStack {
              Text("Ends in 20 hours")
                .font(.system(size: 10, weight: .bold))
                .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
                .padding(.horizontal, 2)
            }
            .cornerRadius(2)
            .overlay(RoundedRectangle(cornerRadius: 2)
            .stroke(Color(red: 0.80, green: 0.80, blue: 0.80), lineWidth: 1))
            Text("Sponsor the Forefront Newsletter")
              .font(.system(size: 12, weight: .semibold))
          }
//          HStack(alignment: .center, spacing: 4) {
//            ZStack {
//              Text("Ends in 20 hours")
//                .font(.system(size: 10, weight: .bold))
//                .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
//                .padding(.horizontal, 2)
//            }
//            .cornerRadius(2)
//            .overlay(RoundedRectangle(cornerRadius: 2)
//            .stroke(Color(red: 0.80, green: 0.80, blue: 0.80), lineWidth: 1))
//            Text("Extend Deadline for Hub issues Funding")
//              .font(.system(size: 12, weight: .medium))
//          }
//          HStack(alignment: .center, spacing: 4) {
//            ZStack {
//              Text("Starts in 20 minutes")
//                .font(.system(size: 10, weight: .bold))
//                .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
//                .padding(.horizontal, 2)
//            }
//            .cornerRadius(2)
//            .overlay(RoundedRectangle(cornerRadius: 2)
//            .stroke(Color(red: 0.80, green: 0.80, blue: 0.80), lineWidth: 1))
//            Text("Removing the Founder Allocation for the Founder multisig")
//              .font(.system(size: 12, weight: .medium))
//          }
          
          Spacer(minLength: 0)
        }
      }
      .foregroundColor(colorScheme == .light ? .black : .white)
      .padding(16)
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

@main
struct AuctionGovernance: Widget {
  let kind: String = "AuctionGovernance"
  
  var body: some WidgetConfiguration {
    IntentConfiguration(kind: kind, intent: SelectDAOIntent.self, provider: Provider()) { entry in
      AuctionGovernanceEntryView(entry: entry)
    }
    .supportedFamilies([
      .systemMedium, .systemLarge])
    .configurationDisplayName("Auction & Governance")
    .description("This widget displays the current auction state and active proposals.")
  }
}
