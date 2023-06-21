import React from 'react'
import { Image, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

type DaoCardImageProps = {
  daoAddress: string
  metadataAddress: string
  tokenId: number | string
}

const DaoCardImage = ({
  daoAddress,
  metadataAddress,
  tokenId
}: DaoCardImageProps) => {
  const [showShimmer, setShowShimmer] = React.useState(true)
  const [loadError, setLoadError] = React.useState(false)

  return (
    <View className="w-full h-full">
      <Image
        onError={() => setLoadError(true)}
        onLoadEnd={() => setShowShimmer(false)}
        source={{
          // TODO: move to config
          uri: `https://api.builderwidgets.wtf/image/${metadataAddress}/${tokenId}`
        }}
        className="rounded-lg h-full w-full"
      />
      {loadError && (
        <View className="absolute rounded-lg w-full h-full z-10">
          <Text className="text-red/50 text-center text-xs my-auto">
            Couldn't{'\n'}load image
          </Text>
        </View>
      )}
      {showShimmer && (
        <View className="absolute rounded-lg w-full h-full -z-10">
          <ShimmerPlaceHolder
            duration={2500}
            width={400}
            contentStyle={{ visibility: showShimmer ? 'hidden' : 'visible' }}
            style={{ borderRadius: 8, width: '100%', height: '100%' }}
            shimmerWidthPercent={0.5}
            shimmerColors={['#F2F2F2', '#E7E7E7', '#F2F2F2']}
          />
        </View>
      )}
    </View>
  )
}

export default DaoCardImage
