import { useQuery } from '@apollo/client'
import React from 'react'
import { Image, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import config from '../../../config'
import { IMAGE_QUERY } from '../../constants/queries'
import Svg, { Path } from 'react-native-svg'
import clsx from 'clsx'

const { app: appConfig } = config

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

type DaoCardImageProps = {
  daoAddress: string
  metadataAddress: string
  tokenId: number | string
  imageType?: 'thumbnail' | 'full'
}

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
    onCompleted: () => setLoadError(true),
    onError: () => setLoadError(true)
  })

  const image = data?.token?.token?.image
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
          onLoad={() => {
            if (loadError) setLoadError(false)
          }}
          onLoadEnd={() => setShowShimmer(false)}
          source={{
            uri: imageUrl
          }}
          className="rounded-lg h-full w-full"
        />
      )}
      <View className="absolute w-full h-full border border-grey-three/20 z-10 rounded-lg" />
      {loadError && !showShimmer && (
        <View className="absolute rounded-lg w-full h-full z-10">
          <Svg
            viewBox="0 0 28 28"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={clsx(
              imageType === 'thumbnail' ? 'w-8 h-8' : 'w-12 h-12',
              'stroke-grey-two text-grey-two mx-auto my-auto'
            )}>
            <Path d="m23.5 14.568-2.909-2.909a2.249 2.249 0 0 0-3.182 0L16 13.068 15 14" />
            <Path d="m4 17.25 5.159-5.159a2.25 2.25 0 0 1 3.182 0L18.5 18m5-3.5v-7A1.5 1.5 0 0 0 22 6H5.5A1.5 1.5 0 0 0 4 7.5v12A1.5 1.5 0 0 0 5.5 21H17M15 9.75h.008v.008H15V9.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            <Path
              d="m20.124 14.573-.003-.003a.722.722 0 0 0-1.216.517.726.726 0 0 0 .194.507l.003.003 2.877 2.888-2.876 2.886a.726.726 0 0 0 .507 1.254.722.722 0 0 0 .515-.23L23 19.51l2.875 2.886a.724.724 0 0 0 1.038.017.727.727 0 0 0-.016-1.042l-2.876-2.886 2.877-2.888.003-.003a.726.726 0 0 0-.516-1.219.722.722 0 0 0-.506.195l-.003.003L23 17.46l-2.876-2.887Z"
              strokeWidth="0.25"
              fill="currentColor"
            />
          </Svg>
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
