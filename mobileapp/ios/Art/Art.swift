import WidgetKit
import SwiftUI

struct ArtProvider: IntentTimelineProvider {
  typealias Entry = ArtEntry
  
  let dataLoader = WidgetDataLoader()
  
  func placeholder(in context: Context) -> ArtEntry {
    ArtEntry(date: Date(), image: UIImage(named: "Placeholder")!.pngData()!, state: .success)
  }
  
  func getSnapshot(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (ArtEntry) -> Void) {
    let address = configuration.dao?.identifier ?? dataLoader.placeholderDao.address
    
    dataLoader.fetchImageData(daoAddress: address) { imageData in
      if let image = imageData {
        let entry = ArtEntry(date: Date(), image: image, state: .success)
        completion(entry)
      } else {
        let entry = ArtEntry(date: Date(), image: nil, state: .error)
        completion(entry)
      }
    }
  }
  
  func getTimeline(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> Void) {
    let address = configuration.dao?.identifier ?? dataLoader.placeholderDao.address
    
    dataLoader.fetchImageData(daoAddress: address) { imageData in
      if let image = imageData {
        let entry = ArtEntry(date: Date(), image: image, state: .success)
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
      } else {
        let entry = ArtEntry(date: Date(), image: nil, state: .error)
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

struct ArtEntry: TimelineEntry {
  let date: Date
  let image: Data?
  let state: WidgetState
}

struct ArtEntryView: View {
  var entry: ArtProvider.Entry
  
  @Environment(\.widgetFamily) var widgetFamily
  @Environment(\.colorScheme) var colorScheme
  
  var body: some View {
    switch entry.state {
    case .success:
      Image(uiImage: UIImage(data: entry.image!)!)
        .resizable()
        .aspectRatio(contentMode: .fit)
    case .error:
      VStack {
        Image(systemName: "xmark.octagon").padding(.bottom, 1)
        Text("Error happened")
      }
      .foregroundColor(colorScheme == .light ? .black : .white)
    }
  }
}

@main
struct ArtWidget: Widget {
  let kind: String = "Art"
  
  var body: some WidgetConfiguration {
    IntentConfiguration(kind: kind, intent: SelectDAOIntent.self, provider: ArtProvider()) { entry in
      ArtEntryView(entry: entry)
    }
    .supportedFamilies([.systemSmall])
    .configurationDisplayName("Art")
    .description("This widget displays the current auctioned NFT image of your selected DAO.")
  }
}
