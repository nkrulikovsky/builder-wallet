import SwiftUI

enum ProposalDisplayType {
  case compact, full
}

struct ProposalsView: View {
  let proposals: [ProposalData]
  
  @Environment(\.widgetFamily) var widgetFamily
  
  var body: some View {
    if (proposals.isEmpty) {
      Text("All done. No Active or Pending props ⌐◨-◨")
        .font(.system(size: 12))
        .padding(.top, 2)
    } else {
      let maxShow = widgetFamily == .systemMedium ? 3 : 5
      let displayProposals = proposals.prefix(maxShow)
      
      ForEach(displayProposals, id: \.id) { proposal in
        ProposalView(
          proposal: proposal,
          displayType: widgetFamily == .systemMedium ? .compact : .full
        )
      }
    }
  }
}

struct ProposalView: View {
  let proposal: ProposalData
  let displayType: ProposalDisplayType
  
  let timeLeft: Double
  let endsIn: String
  
  let timeLeftColor: Color
  let timeLeftBorder: Color
  
  let stateColor: Color
  let stateBorder: Color
  
  @Environment(\.colorScheme) var colorScheme
  
  init(proposal: ProposalData, displayType: ProposalDisplayType) {
    self.proposal = proposal
    self.displayType = displayType
    
    timeLeft = max(0, Double(proposal.endTime) - Date().timeIntervalSince1970)
    
    let formatter = RelativeDateTimeFormatter()
    formatter.unitsStyle = .short
    formatter.dateTimeStyle = .numeric
    formatter.locale = Locale(identifier: "en-US")
    
    endsIn = formatter.localizedString(
      for: Date(timeIntervalSince1970: proposal.endTime),
      relativeTo: Date.now
    )
    
    if (timeLeft <= 43200) {
      timeLeftColor = Color(red: 1, green: 0.226, blue: 0.226)
      timeLeftBorder = timeLeftColor.opacity(0.3)
    } else {
      timeLeftColor = Color(red: 0.55, green: 0.55, blue: 0.55)
      timeLeftBorder = Color(red: 0.80, green: 0.80, blue: 0.80)
    }
    
    if (proposal.state == "ACTIVE") {
      stateColor = Color(red: 1, green: 0.226, blue: 0.226)
      stateBorder = timeLeftColor.opacity(0.3)
    } else {
      stateColor = Color(red: 0.55, green: 0.55, blue: 0.55)
      stateBorder = Color(red: 0.80, green: 0.80, blue: 0.80)
    }
  }
  
  var body: some View {
    switch displayType {
    case .compact:
      if (proposal.state == "ACTIVE") {
        compact
      }
    case .full:
      full
    }
  }
  
  var compact: some View {
    return HStack(alignment: .center, spacing: 4) {
      ZStack {
        Text("Ends \(endsIn)")
          .font(.system(size: 10, weight: .bold))
          .foregroundColor(timeLeftColor)
          .padding(.horizontal, 2)
      }
      .cornerRadius(2)
      .overlay(
        RoundedRectangle(cornerRadius: 2)
          .stroke(
            timeLeftBorder,
            lineWidth: 1
          )
      )
      Text(proposal.title)
        .font(.system(size: 12, weight: .semibold))
        .lineLimit(1)
    }
  }
  
  var full: some View {
    VStack(alignment: .leading, spacing: 1) {
      HStack(alignment: .center, spacing: 4) {
        ZStack {
          Text("Ends in 20 hours")
            .font(.system(size: 10, weight: .bold))
            .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
            .padding(.horizontal, 2)
        }
        .cornerRadius(2)
        .overlay(
          RoundedRectangle(cornerRadius: 2)
            .stroke(
              Color(red: 0.80, green: 0.80, blue: 0.80),
              lineWidth: 1
            )
        )
        Text(proposal.title)
          .font(.system(size: 12, weight: .semibold))
      }
    }
  }
}
