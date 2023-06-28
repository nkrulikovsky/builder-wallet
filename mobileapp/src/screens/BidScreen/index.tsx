import { RootStackScreenProps } from '../../navigation/types'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { WebView } from 'react-native-webview'

const BidScreen = ({ route, navigation }: RootStackScreenProps<'Bid'>) => {
  const [loading, setLoading] = React.useState(true)

  const dao = route.params.dao
  const uri = `https://nouns.build/dao/${dao.address}/${dao.auction.id}`

  return (
    <View className="flex-1">
      <WebView
        source={{ uri: uri }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        className="flex-1 bg-white"
      />
      {loading && (
        <View className="absolute h-full w-full bg-white items-center justify-center">
          <ActivityIndicator className="mb-20" size="small" color="#9D9D9D" />
        </View>
      )}
    </View>
  )
}

export default BidScreen
