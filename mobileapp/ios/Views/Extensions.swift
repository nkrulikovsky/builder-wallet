//
//  Extensions.swift
//  mobileapp
//
//  Created by NG on 10.01.2024.
//

import Foundation
import SwiftUI

extension View {
    func widgetBackground(backgroundView: some View) -> some View {
        if #available(iOSApplicationExtension 17.0, *) {
            return containerBackground(for: .widget) {
              backgroundView
            }
        } else {
            return background(backgroundView)
        }
    }
  
    @ViewBuilder
    func paddingForOlderVersions() -> some View {
        if #available(iOSApplicationExtension 17.0, *) {
            self
        } else {
            self.padding(16)
        }
    }
}

extension WidgetConfiguration {
    func contentMarginsDisabledIfAvailable() -> some WidgetConfiguration {
      if #available(iOSApplicationExtension 17.0, *) {
        return self.contentMarginsDisabled()
      } else {
        return self
      }
    }
}
