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
      governance: [
        ProposalData(id: "0x1", number: 1, title: "Placeholder Proposal N1", state: "ACTIVE", endTime: 1683789333, quorum: 18, votes: ProposalVotes(yes: 20, no: 0, abstain: 0)),
        ProposalData(id: "0x2", number: 2, title: "Placeholder Proposal N2", state: "ACTIVE", endTime: 1683789333, quorum: 18, votes: ProposalVotes(yes: 12, no: 6, abstain: 6)),
      ],
      state: .success
    )
  }
  
  func getSnapshot(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let address = configuration.dao?.identifier
    
    if let address = address {
      dataLoader.fetchAuctionAndGovernanceData(daoAddress: address) { data in
        if data?.auction != nil && data?.governance != nil {
          let entry = SimpleEntry(
            date: Date(),
            auction: data?.auction,
            governance: data?.governance,
            state: .success
          )
          
          completion(entry)
        } else {
          let entry = SimpleEntry(date: Date(), auction: nil, governance: nil, state: .error)
          completion(entry)
        }
      }
    } else {
      let entry = SimpleEntry(date: Date(), auction: nil, governance: nil, state: .noDao)
      completion(entry)
    }
  }
  
  func getTimeline(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    let address = configuration.dao?.identifier
    
    if let address = address {
      dataLoader.fetchAuctionAndGovernanceData(daoAddress: address) { data in
        if data?.auction != nil {
          let entry = SimpleEntry(
            date: Date(),
            auction: data?.auction,
            governance: data?.governance,
            state: .success
          )
          
          let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
          let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
          completion(timeline)
        } else {
          let entry = SimpleEntry(date: Date(), auction: nil, governance: nil, state: .error)
          let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
          let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
          completion(timeline)
        }
      }
    } else {
      let entry = SimpleEntry(date: Date(), auction: nil, governance: nil, state: .noDao)
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
  let governance: [ProposalData]?
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
      
      VStack(alignment: .leading, spacing: 0) {
        HStack(alignment: .top, spacing: 8) {
          Image(uiImage: UIImage(data: entry.auction!.image)!)
            .resizable()
            .frame(width: 52, height: 52)
            .cornerRadius(8)
          
          VStack(alignment: .leading, spacing: 0) {
            Text("Auction #\(String(entry.auction!.id))")
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
          .padding(.top, 2)
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
          .padding(.top, 2)
          
          Spacer(minLength: 0)
        }
        
        HStack(alignment: .center, spacing: 0) {
          Text("Active Proposals")
            .font(.system(size: 12))
            .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
          
          let deviderColor = colorScheme == .light
          ? Color(red: 0.8, green: 0.8, blue: 0.8)
          : Color(red: 0.079, green: 0.079, blue: 0.079)
          
          VStack {
            Divider().background(deviderColor)
          }
          .padding(.leading, 4)
        }
        .padding(.top, 4)
        
        ProposalsView(proposals: entry.governance!)
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
