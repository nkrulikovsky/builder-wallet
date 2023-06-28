import { RootStackScreenProps } from '../../navigation/types'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { WebView } from 'react-native-webview'

const ProposalScreen = ({
  route,
  navigation
}: RootStackScreenProps<'Proposal'>) => {
  const [loading, setLoading] = React.useState(true)

  const proposal = route.params.proposal
  const uri = `https://nouns.build/dao/${proposal.collectionAddress}/vote/${proposal.proposalId}`

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

export default ProposalScreen
