import { RootStackScreenProps } from '../../navigation/types'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { manualDaos } from '../../constants/manualDaos'
import { isAddressEqual } from 'viem'

const ProposalsScreen = ({
  route,
  navigation
}: RootStackScreenProps<'Proposals'>) => {
  const [loading, setLoading] = React.useState(true)

  const dao = route.params.dao

  let uri

  const manualDao = manualDaos.find(d =>
    isAddressEqual(
      d.collectionAddress as `0x${string}`,
      dao.address as `0x${string}`
    )
  )

  if (manualDao && manualDao.name === 'Nouns') {
    uri = `https://nouns.wtf/vote`
  } else if (manualDao && manualDao.name === 'Lil Nouns') {
    uri = `https://lilnouns.wtf/vote`
  } else {
    uri = `https://nouns.build/dao/${dao.address}?tab=activity`
  }

  return (
    <View className="flex-1">
      <WebView
        source={{ uri: uri }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        className="flex-1 bg-white"
        originWhitelist={['https://*', 'rainbow://*, metamask://*']}
      />
      {loading && (
        <View className="absolute h-full w-full bg-white items-center justify-center">
          <ActivityIndicator className="mb-20" size="small" color="#9D9D9D" />
        </View>
      )}
    </View>
  )
}

export default ProposalsScreen
