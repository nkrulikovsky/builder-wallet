import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Image, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import config from '../../../config'

const { app: appConfig } = config

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

type DaoCardImageProps = {
  daoAddress: string
  metadataAddress: string
  tokenId: number | string
  imageType?: 'thumbnail' | 'full'
}

const IMAGE_QUERY = gql`
  query Image($address: String!, $tokenId: String!) {
    token(token: { address: $address, tokenId: $tokenId }) {
      token {
        image {
          url
          mimeType
          mediaEncoding {
            ... on ImageEncodingTypes {
              original
              thumbnail
            }
            ... on UnsupportedEncodingTypes {
              __typename
              original
            }
          }
        }
      }
    }
  }
`

const DaoCardImage = ({
  daoAddress,
  metadataAddress,
  tokenId,
  imageType = 'full'
}: DaoCardImageProps) => {
  const [showShimmer, setShowShimmer] = React.useState(true)
  const [loadError, setLoadError] = React.useState(false)

  const { data } = useQuery(IMAGE_QUERY, {
    variables: { address: daoAddress, tokenId: String(tokenId) },
    onError: () => setLoadError(true)
  })

  const image = data?.token.token?.image
  const media = image?.mediaEncoding

  let imageUrl = undefined

  if ((image && String(image.mimeType).includes('svg')) || !image) {
    imageUrl = `${appConfig.imageEndpoint}/${daoAddress}/${tokenId}?type=${imageType}`
  } else if (media && imageType === 'thumbnail' && media.thumbnail) {
    imageUrl = media.thumbnail
  } else if (media && media.original) {
    imageUrl = media.original
  }

  return (
    <View className="w-full h-full">
      {imageUrl && (
        <Image
          onError={() => setLoadError(true)}
          onLoadEnd={() => setShowShimmer(false)}
          source={{
            uri: imageUrl
          }}
          className="rounded-lg h-full w-full"
        />
      )}
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
