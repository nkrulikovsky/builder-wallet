import SwiftUI

enum ProposalDisplayType {
  case compact, full
}

struct ProposalView: View {
  let proposal: ProposalData
  let displayType: ProposalDisplayType
  
  let timeLeft: Double
  let endsIn: String
  
  let isActive: Bool
  
  let timePrefix: String
  let timeColor: Color
  let timeBorderColor: Color
  
  let state: String
  let stateColor: Color
  let stateBorderColor: Color
  
  @Environment(\.colorScheme) var colorScheme
  
  init(proposal: ProposalData, displayType: ProposalDisplayType, lightTheme: Bool) {
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
      timeColor = Color(red: 0.941, green: 0.196, blue: 0.196)
      timeBorderColor = timeColor.opacity(0.3)
    } else {
      timeColor = Color(red: 0.55, green: 0.55, blue: 0.55)
      timeBorderColor = lightTheme
      ? Color(red: 0.8, green: 0.8, blue: 0.8)
      : Color(red: 0.2, green: 0.2, blue: 0.2)
    }
    
    if (proposal.state == "ACTIVE") {
      isActive = true
      
      timePrefix = "Ends"
      state = "Active"
      
      stateColor = Color(red: 0.114, green: 0.714, blue: 0.529)
      stateBorderColor = stateColor.opacity(0.3)
    } else {
      isActive = false
      
      timePrefix = "Starts"
      state = "Pending"
      
      stateColor = Color(red: 0.55, green: 0.55, blue: 0.55)
      stateBorderColor = lightTheme
      ? Color(red: 0.8, green: 0.8, blue: 0.8)
      : Color(red: 0.2, green: 0.2, blue: 0.2)
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
        Text("\(timePrefix) \(endsIn)")
          .font(.system(size: 8, weight: .bold))
          .foregroundColor(timeColor)
          .padding(.vertical, 2)
          .padding(.horizontal, 3)
      }
      .cornerRadius(2)
      .overlay(
        RoundedRectangle(cornerRadius: 2)
          .stroke(
            timeBorderColor,
            lineWidth: 1
          )
      )
      Text(proposal.title)
        .font(.system(size: 12, weight: .semibold))
        .lineLimit(1)
    }
  }
  
  var full: some View {
    let ordinaryBorderColor = colorScheme == .light
    ? Color(red: 0.8, green: 0.8, blue: 0.8)
    : Color(red: 0.2, green: 0.2, blue: 0.2)
    
    return VStack(alignment: .leading, spacing: 1) {
      Text("\(proposal.number) • \(proposal.title)")
        .font(.system(size: 12, weight: .semibold))
        .lineLimit(1)
      HStack(alignment: .center, spacing: 4) {
        BoxText(
          text: state,
          textColor: stateColor,
          borderColor: stateBorderColor
        )
        BoxText(
          text: "\(timePrefix) \(endsIn)",
          textColor: timeColor,
          borderColor: timeBorderColor
        )
        if (isActive) {
          HStack(alignment: .center, spacing: 4) {
            BoxText(
              text: String(proposal.votes!.yes),
              textColor: Color(red: 0.114, green: 0.714, blue: 0.529),
              borderColor: Color(red: 0.114, green: 0.714, blue: 0.529, opacity: 0.3)
            )
            BoxText(
              text: String(proposal.votes!.abstain),
              textColor: Color(red: 0.55, green: 0.55, blue: 0.55),
              borderColor: ordinaryBorderColor
            )
            BoxText(
              text: String(proposal.votes!.no),
              textColor: Color(red: 0.941, green: 0.196, blue: 0.196),
              borderColor: Color(red: 0.941, green: 0.196, blue: 0.196, opacity: 0.3)
            )
          }
          .padding(.horizontal, 2)
          BoxText(
            text: String(proposal.quorum),
            prefix: "Quorum:",
            textColor: Color(red: 0.55, green: 0.55, blue: 0.55),
            prefixColor: ordinaryBorderColor,
            borderColor: ordinaryBorderColor
          )
        }
      }
    }
  }
}

struct BoxText: View {
  let text: String
  let prefix: String?
  
  let textColor: Color
  let prefixColor: Color?
  
  let borderColor: Color
  
  init(
    text: String,
    prefix: String? = nil,
    textColor: Color,
    prefixColor: Color? = nil,
    borderColor: Color
  ) {
    self.text = text
    self.prefix = prefix
    self.textColor = textColor
    self.prefixColor = prefixColor
    self.borderColor = borderColor
  }
  
  var body: some View {
    ZStack {
      HStack(alignment: .center, spacing: 0) {
        if (prefix != nil) {
          Text(prefix!)
            .font(.system(size: 8, weight: .bold))
            .foregroundColor(prefixColor != nil ? prefixColor : textColor)
            .padding(.trailing, 1)
        }
        Text(text)
          .font(.system(size: 8, weight: .bold))
          .foregroundColor(textColor)
      }
      .padding(.vertical, 2)
      .padding(.horizontal, 3)
    }
    .cornerRadius(2)
    .overlay(
      RoundedRectangle(cornerRadius: 2)
        .stroke(
          borderColor,
          lineWidth: 1
        )
    )
  }
}
