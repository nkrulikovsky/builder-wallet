import React from 'react'
import { Image, Text, View } from 'react-native'
import { SearchDao } from '../../store/daoSearch'
import { SavedDao } from '../../store/daos'
import { gql, useQuery } from '@apollo/client'
import Countdown from '../Countdown'

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

  // TODO: correct loading and error states
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error! {error.message}</Text>

  const activeMarket = data.nouns.nounsActiveMarket

  const tokenId = activeMarket?.tokenId ?? ''
  const highestBid = activeMarket?.highestBidPrice.nativePrice.decimal ?? '-'
  const imageUrl = activeMarket?.metadata ?? ''
  const endTime = activeMarket?.endTime * 1000

  const displayName = `${dao.name} #${tokenId}`
  const bid = `${highestBid} Ξ`

  return (
    <View className="flex flex-row items-center mb-3">
      <View className="bg-grey-one rounded-xl w-36 h-36">
        {/* <Image
            source={{ uri: imageUrl }}
            style={{ width: '100%', height: '100%' }}
          /> */}
      </View>
      <View className="ml-4">
        <Text className="text-xl font-bold whitespace-normal">
          {displayName}
        </Text>
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
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default DaoCard
