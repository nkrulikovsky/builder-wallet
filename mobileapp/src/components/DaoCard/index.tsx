import React from 'react'
import { Image, Text, View } from 'react-native'
import { SearchDao } from '../../store/daoSearch'
import { SavedDao } from '../../store/daos'
import { gql, useQuery } from '@apollo/client'
import Countdown from '../Countdown'
import DaoCardImage from '../DaoCardImage'

type DaoCardProps = {
  dao: SavedDao | SearchDao
}

const DAO_QUERY = gql`
  query BuilderDAOsProps($address: String!) {
    nouns {
      nounsActiveMarket(where: { collectionAddress: $address }) {
        tokenId
        endTime
        estimatedDurationTime
        highestBidPrice {
          nativePrice {
            decimal
          }
        }
        metadata
      }
    }
  }
`

const DaoCard = ({ dao }: DaoCardProps) => {
  const { loading, error, data } = useQuery(DAO_QUERY, {
    variables: { address: dao.address }
  })

  if (loading)
    return (
      <View className="flex flex-row items-center mb-3">
        <View className="bg-grey-one rounded-xl w-36 h-36" />
        <View className="ml-4">
          <View className="bg-grey-one rounded-md h-5 w-40" />
          <View className="pt-4 flex flex-col gap-2">
            <View className="bg-grey-one rounded-md h-3 w-20" />
            <View className="bg-grey-one rounded-md h-4 w-16" />
            <View className="bg-grey-one rounded-md h-3 w-12" />
            <View className="bg-grey-one rounded-md h-4 w-24" />
          </View>
        </View>
      </View>
    )
  // TODO: better error state
  if (error)
    return (
      <View className="flex flex-row items-center mb-3">
        <View className="bg-grey-one rounded-xl w-36 h-36" />
        <View className="ml-4">
          <Text className="text-xl font-bold text-red">Couldn't load Dao</Text>
          <View className="pt-4 flex flex-col gap-2">
            <Text className="text-red">Try again later</Text>
            <View className="bg-grey-one rounded-md h-3 w-20" />
            <View className="bg-grey-one rounded-md h-3 w-16" />
          </View>
        </View>
      </View>
    )

  const activeMarket = data.nouns.nounsActiveMarket

  if (!activeMarket) return null

  const tokenId = activeMarket?.tokenId
  const highestBid = activeMarket?.highestBidPrice.nativePrice.decimal
  const endTime = activeMarket?.endTime * 1000

  const displayName = `${dao.name} #${tokenId}`
  const bid = `${highestBid} Ξ`

  return (
    <View className="flex flex-row items-center mb-3">
      <View className="bg-grey-one rounded-xl w-36 h-36">
        <DaoCardImage
          daoAddress={dao.address}
          metadataAddress={activeMarket?.metadata}
          tokenId={tokenId}
        />
      </View>
      <View className="ml-4">
        <Text className="text-xl font-bold truncate">{displayName}</Text>
        <View className="pt-2 flex flex-col gap-1">
          <View>
            <Text className="text-sm text-grey-three">Highest Bid</Text>
            <Text className="text-base font-bold text-black">{bid}</Text>
          </View>
          <View className="">
            <Text className="text-sm text-grey-three">Ends In</Text>
            <Countdown
              timestamp={endTime}
              style="text-base font-bold text-black"
              endText="Ended"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default DaoCard
