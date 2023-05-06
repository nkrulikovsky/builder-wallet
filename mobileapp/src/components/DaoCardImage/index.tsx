import React, { useEffect } from 'react'
import { Image } from 'react-native'

type DaoCardImageProps = {
  daoAddress: string
  metadataAddress: string
  tokenId: number | string
}

const fetchImage = async (address: string, id: number | string) => {
  try {
    // TODO: move to config
    const url = `https://api.builderwidgets.wtf/image/${address}/${id}`

    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}

const DaoCardImage = ({
  daoAddress,
  metadataAddress,
  tokenId
}: DaoCardImageProps) => {
  const [image, setImage] = React.useState<string | null>(null)

  useEffect(() => {
    fetchImage(metadataAddress, tokenId).then(data => {
      setImage(data)
    })
  }, [metadataAddress, tokenId])

  if (!image) {
    return null
  }

  return <Image source={{ uri: image }} className="rounded-lg h-full w-full" />
}

export default DaoCardImage
