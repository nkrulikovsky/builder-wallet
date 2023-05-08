import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SearchDao, useDaoSearchStore } from '../../store/daoSearch'
import { SavedDao, useDaosStore } from '../../store/daos'
import { gql, useQuery } from '@apollo/client'
import Countdown from '../Countdown'
import DaoCardImage from '../DaoCardImage'
import { Path, Svg } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import { CurrentAuction, DAO } from '../../utils/types'

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
  const navigation = useNavigation()
  const savedDaos = useDaosStore(state => state.saved)
  const save = useDaosStore(state => state.save)
  const removeFromSaved = useDaosStore(state => state.removeFromSaved)
  const activeSearch = useDaoSearchStore(state => state.active)

  const { loading, error, data } = useQuery(DAO_QUERY, {
    variables: { address: dao.address }
  })

  if (loading)
    return (
      <View className="flex flex-row items-center mb-3">
        <View className="bg-grey-one rounded-lg w-36 h-36" />
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
        <View className="bg-grey-one rounded-lg w-36 h-36" />
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

  const daoIsSaved = savedDaos.some(
    savedDao => savedDao.address === dao.address
  )

  const unsaveOrOpen = () => {
    if (activeSearch) {
      if (daoIsSaved) removeFromSaved(dao.address)
      else save(dao)
    } else if (activeMarket) {
      const daoData: DAO = {
        name: dao.name,
        address: dao.address,
        metadata: activeMarket.metadata,
        auction: {
          id: activeMarket?.tokenId,
          highestBid: activeMarket?.highestBidPrice.nativePrice.decimal,
          endTime: activeMarket?.endTime * 1000
        }
      }

      navigation.navigate('Dao', {
        dao: daoData
      })
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={unsaveOrOpen}>
      <View
        className="box-border flex flex-row items-center mb-3 rounded-lg"
        style={daoIsSaved && activeSearch ? style.selected : style.nonSelected}>
        <View className="bg-grey-one rounded-lg w-36 h-36">
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
        {daoIsSaved && activeSearch && (
          <Svg
            viewBox="0 0 24 24"
            className="absolute right-2 bottom-2 fill-grey-two w-6 h-6">
            <Path
              fillRule="evenodd"
              d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </Svg>
        )}
      </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  selected: {
    borderColor: '#F2F2F2',
    borderWidth: 2
  },
  nonSelected: {
    borderColor: 'transparent',
    borderWidth: 2
  }
})

export default DaoCard
