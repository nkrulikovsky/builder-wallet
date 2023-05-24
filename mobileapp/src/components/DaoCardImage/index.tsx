import React, { useEffect } from 'react'
import { Image } from 'react-native'

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
  return (
    <Image
      source={{
        // TODO: move to config
        uri: `https://api.builderwidgets.wtf/image/${metadataAddress}/${tokenId}`
      }}
      className="rounded-lg h-full w-full"
    />
  )
}

export default DaoCardImage
