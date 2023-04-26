import React from 'react'
import { Image } from 'react-native'
import { SvgUri } from 'react-native-svg'
import { gql, useQuery } from '@apollo/client'

type DaoCardImageProps = {
  daoAddress: string
  metadataAddress?: string
  tokenId: number | string
}

const IMAGE_QUERY = gql`
  query Image($address: String!, $tokenId: String!) {
    token(token: { address: $address, tokenId: $tokenId }) {
      token {
        metadata
        image {
          url
          mimeType
        }
      }
    }
  }
`

// TODO: clean up this component
const DaoCardImage = ({
  daoAddress,
  metadataAddress,
  tokenId
}: DaoCardImageProps) => {
  const { loading, error, data } = useQuery(IMAGE_QUERY, {
    variables: { address: daoAddress, tokenId }
  })

  const image = data?.token?.token?.image
  //   const image = data?.token?.token?.metadata?.image

  if (!image) {
    return null
  }

  //   if (image.mimeType === 'image/svg+xml') {
  //     return (
  //       <SvgUri
  //         width="100%"
  //         height="100%"
  //         className="rounded-xl"
  //         uri={image.url}
  //       />
  //     )
  //   }

  return (
    <Image source={{ uri: image.url }} className="rounded-lg h-full w-full" />
  )
}

export default DaoCardImage
