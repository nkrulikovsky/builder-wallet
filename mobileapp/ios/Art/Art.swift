import WidgetKit
import SwiftUI
//import SelectDAOIntent

struct ArtProvider: IntentTimelineProvider {
  typealias Entry = ArtEntry
  typealias Intent = SelectDAOIntent
  
  let widgetDataLoader = WidgetDataLoader()
  
  func placeholder(in context: Context) -> ArtEntry {
    ArtEntry(date: Date(), image: UIImage(named: "placeholder")!.pngData()!)
  }
  
  func getSnapshot(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (ArtEntry) -> Void) {
    let entry = ArtEntry(date: Date(), image: UIImage(named: "placeholder")!.pngData()!)
    completion(entry)
  }
  
  func getTimeline(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> Void) {
    widgetDataLoader.getSavedDAOs { daos in
      //      guard let daoName = configuration.dao?.identifier, let dao = daos.first(where: { $0.name == daoName }) else {
      //        let entry = ArtEntry(date: Date(), image: UIImage(named: "placeholder")!.pngData()!)
      //        let timeline = Timeline(entries: [entry], policy: .atEnd)
      //        completion(timeline)
      //        return
      //      }
      
      //TODO: handle nil values
      let address = configuration.dao?.identifier ?? "0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60"
      
      widgetDataLoader.fetchImageData(daoAddress: address) { imageData in
        let image = (imageData != nil) ? UIImage(data: imageData!)! : UIImage(named: "placeholder")!
        let entry = ArtEntry(date: Date(), image: image.pngData()!)
        let timeline = Timeline(entries: [entry], policy: .atEnd)
        completion(timeline)
      }
    }
  }
}


struct ArtEntry: TimelineEntry {
  let date: Date
  let image: Data
//  let configuration: SelectDAOIntent
}

struct ArtEntryView: View {
  var entry: ArtProvider.Entry
  
  @Environment(\.widgetFamily) var widgetFamily
  
  var body: some View {
    Image(uiImage: UIImage(data: entry.image)!)
      .resizable()
      .aspectRatio(contentMode: .fit)
  }
}

@main
struct ArtWidget: Widget {
  let kind: String = "Art"
  
  var body: some WidgetConfiguration {
    IntentConfiguration(kind: kind, intent: SelectDAOIntent.self, provider: ArtProvider()) { entry in
      ArtEntryView(entry: entry)
    }.supportedFamilies([.systemSmall, .systemMedium])
      .configurationDisplayName("Art")
      .description("This widget displays images from your selected DAOs.")
  }
}

struct ArtWidget_Previews: PreviewProvider {
  static var previews: some View {
    ArtEntryView(entry: ArtEntry(date: Date(), image: UIImage(named: "placeholder")!.pngData()!))
      .previewContext(WidgetPreviewContext(family: .systemSmall))
  }
}

