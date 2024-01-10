import WidgetKit
import SwiftUI

struct Provider: IntentTimelineProvider {
  let dataLoader = WidgetDataLoader()
  
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(
      date: Date(),
      daoName: "Placeholder",
      governance: [
        ProposalData(id: "0x1", number: 1, title: "Placeholder Proposal N1", state: "ACTIVE", endTime: 1683789333, quorum: 18, votes: ProposalVotes(yes: 20, no: 0, abstain: 0)),
        ProposalData(id: "0x2", number: 2, title: "Placeholder Proposal N2", state: "ACTIVE", endTime: 1683789333, quorum: 18, votes: ProposalVotes(yes: 12, no: 6, abstain: 6)),
      ],
      state: .success
    )
  }
  
  func getSnapshot(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let address = configuration.dao?.identifier ?? dataLoader.placeholderDao.address
    let daoName = configuration.dao?.displayString ?? dataLoader.placeholderDao.name
    
    dataLoader.fetchAuctionAndGovernanceData(daoAddress: address) { data in
      if let governance = data?.governance {
        let entry = SimpleEntry(
          date: Date(),
          daoName: daoName,
          governance: governance,
          state: .success
        )
        
        completion(entry)
      } else {
        let entry = SimpleEntry(date: Date(), daoName: daoName, governance: nil, state: .error)
        completion(entry)
      }
    }
  }
  
  func getTimeline(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    let address = configuration.dao?.identifier ?? dataLoader.placeholderDao.address
    let daoName = configuration.dao?.displayString ?? dataLoader.placeholderDao.name
    
    dataLoader.fetchGovernanceData(daoAddress: address) { data in
      if let governance = data?.governance {
        let entry = SimpleEntry(
          date: Date(),
          daoName: daoName,
          governance: governance,
          state: .success
        )
        
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
      } else {
        let entry = SimpleEntry(date: Date(), daoName: daoName, governance: nil, state: .error)
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
      }
    }
  }
}

enum WidgetState {
  case success, error
}

struct SimpleEntry: TimelineEntry {
  let date: Date
  let daoName: String?
  let governance: [ProposalData]?
  let state: WidgetState
}

struct GovernanceEntryView : View {
  var entry: Provider.Entry
  
  @Environment(\.widgetFamily) var widgetFamily
  @Environment(\.colorScheme) var colorScheme
  
  var body: some View {
    switch entry.state {
    case .success:
      let deviderColor = colorScheme == .light
      ? Color(red: 0.8, green: 0.8, blue: 0.8)
      : Color(red: 0.079, green: 0.079, blue: 0.079)
      
      VStack(alignment: .leading, spacing: 4) {
        HStack(alignment: .center, spacing: 0) {
          Text(entry.daoName!)
            .font(.system(size: 12, weight: .bold))
          
          Spacer()
          
          HStack(alignment: .center, spacing: 2) {
            let activeProps = entry.governance!.filter { $0.state == "ACTIVE" }.count
            let pendingProps = entry.governance!.filter { $0.state == "PENDING" }.count
            
            if activeProps > 0 {
              Text("Active")
                .font(.system(size: 12))
                .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
              Text(String(activeProps))
                .font(.system(size: 12))
            }
            if pendingProps > 0 {
              Text("Pending")
                .font(.system(size: 12))
                .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
                .padding(.leading, 2)
              Text(String(pendingProps))
                .font(.system(size: 12))
            }
          }
        }
        
        VStack {
          Divider().background(deviderColor)
        }
        
        VStack(alignment: .leading, spacing: 4) {
          if (entry.governance!.isEmpty) {
            Text("All done. No Active or Pending props ⌐◨-◨")
              .font(.system(size: 12))
          } else {
            let maxShow = widgetFamily == .systemMedium ? 3 : 9
            let displayProposals = entry.governance!.prefix(maxShow)
            
            ForEach(displayProposals, id: \.id) { proposal in
              ProposalView(
                proposal: proposal,
                displayType: .full,
                lightTheme: colorScheme == .light
              )
            }
          }
          
          Spacer(minLength: 0)
        }
      }
      .paddingForOlderVersions()
      .widgetBackground(backgroundView: colorScheme == .light ? Color.white : Color.black)
    case .error:
      VStack {
        Image(systemName: "xmark.octagon").padding(.bottom, 1)
        Text("Error happened")
      }
      .widgetBackground(backgroundView: colorScheme == .light ? Color.white : Color.black)
    }
  }
}

@main
struct Governance: Widget {
  let kind: String = "Governance"
  
  var body: some WidgetConfiguration {
    IntentConfiguration(kind: kind, intent: SelectDAOIntent.self, provider: Provider()) { entry in
      GovernanceEntryView(entry: entry)
    }
    .supportedFamilies([.systemMedium, .systemLarge])
    .configurationDisplayName("Governace")
    .description("Active and pending proposals.")
  }
}
