import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { SearchDao, useDaoSearchStore } from '../../store/daoSearch'
import { SavedDao, useDaosStore } from '../../store/daos'
import { gql, useQuery } from '@apollo/client'
import Countdown from '../Countdown'
import DaoCardImage from '../DaoCardImage'
import { Path, Svg } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import { DAO } from '../../utils/types'

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
        address
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
  const searchDaos = useDaoSearchStore(state => state.searchResults)

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

  const openDaoPage = () => {
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

  const saveOrUnSave = () => {
    if (daoIsSaved) {
      if (searchDaos.some(d => d.address === dao.address)) {
        removeFromSaved(dao.address)
      } else {
        Alert.prompt(
          'Remove Dao',
          `Are you sure you want to remove ${dao.name} from saved?`,
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel'
            },
            {
              text: 'Remove',
              onPress: () => removeFromSaved(dao.address),
              style: 'destructive'
            }
          ],
          'default'
        )
      }
    } else {
      save(dao)
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={openDaoPage}>
      <View className="relative box-border flex flex-row items-center mb-3 rounded-lg">
        <View className="bg-grey-one rounded-lg w-36 h-36">
          <DaoCardImage
            daoAddress={dao.address}
            metadataAddress={activeMarket?.metadata}
            tokenId={tokenId}
            imageType="thumbnail"
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
        {activeSearch && (
          <TouchableOpacity
            className="absolute h-full z-10"
            activeOpacity={0.8}
            onPress={saveOrUnSave}>
            <View className="absolute bottom-0 left-0 h-12 w-12 bg-grey-one/80 rounded-tr-lg rounded-bl-lg flex items-center justify-center">
              {daoIsSaved ? (
                <Svg viewBox="0 0 24 24" className="fill-black w-6 h-6">
                  <Path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                    clipRule="evenodd"
                  />
                </Svg>
              ) : (
                <Svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width={1.5}
                  className="stroke-black w-6 h-6">
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </Svg>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default DaoCard
