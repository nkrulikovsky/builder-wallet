import React, { useState } from 'react'
import { WebView } from 'react-native-webview'
import { PixelRatio, View } from 'react-native'

export default function SvgDaoImage({ image }: { image: string }) {
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 })

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout
    setDimensions({
      width: PixelRatio.getPixelSizeForLayoutSize(width * 1.33),
      height: PixelRatio.getPixelSizeForLayoutSize(height * 1.33)
    })
  }

  const htmlContent = `
    <html>
    <head>
      <style>
        body, html { width: ${dimensions.width}px; height: ${dimensions.height}px; margin: 0; padding: 0; background-color: rgb(242 242 242 / 0.6); }
        img { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <img src="${image}" alt="svg image" />
    </body>
    </html>
  `

  return (
    <View onLayout={onLayout} className="w-full h-full">
      <WebView source={{ html: htmlContent }} style={{ flex: 1 }} />
    </View>
  )
}
