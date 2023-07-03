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
import clsx from 'clsx'
import { DAO_QUERY } from '../../constants/queries'

type DaoCardProps = {
  dao: SavedDao | SearchDao
}

const DaoCard = ({ dao }: DaoCardProps) => {
  const navigation = useNavigation()
  const savedDaos = useDaosStore(state => state.saved)
  const save = useDaosStore(state => state.save)
  const removeFromSaved = useDaosStore(state => state.removeFromSaved)
  const activeSearch = useDaoSearchStore(state => state.active)
  const searchDaos = useDaoSearchStore(state => state.searchResults)

  const { loading, error, data } = useQuery(DAO_QUERY, {
    variables: { address: dao.address },
    pollInterval: 900000
  })

  const activeMarket = data?.nouns.nounsActiveMarket

  if (error || !activeMarket)
    return (
      <View className="flex flex-row items-center mb-3">
        <View className="bg-grey-one rounded-lg w-36 h-36" />
        <View className="ml-4">
          <Text className={clsx('text-xl font-bold', error && 'text-red/90')}>
            {error ? `Couldn't load Dao` : dao.name}
          </Text>
          <View className="pt-4 flex flex-col gap-2">
            <Text className={clsx(error && 'text-red/70')}>
              {error ? `Try to refresh later` : `No tokens minted yet`}
            </Text>
            <View className="bg-grey-one rounded-md h-5 w-20" />
            <View className="bg-grey-one rounded-md h-5 w-16" />
          </View>
        </View>
      </View>
    )

  const tokenId = activeMarket?.tokenId
  const highestBid = activeMarket?.highestBidPrice.nativePrice.decimal
  const endTime = activeMarket?.endTime * 1000

  const displayName = `${dao.name} #${tokenId}`
  const bid = `${highestBid} Ξ`

  const daoIsSaved = savedDaos.some(
    savedDao => savedDao.address === dao.address
  )

  const openDaoPage = () => {
    // Dao page won't open if dao was created,
    // but no token was minted yet
    if (data) {
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
      <View className="relative box-border w-full flex flex-row items-center mb-3 rounded-lg">
        <View className="bg-grey-one/60 rounded-lg w-36 h-36">
          {data && (
            <DaoCardImage
              daoAddress={dao.address}
              metadataAddress={activeMarket?.metadata}
              tokenId={tokenId}
              imageType="thumbnail"
            />
          )}
        </View>
        <View className="ml-4 w-full h-36 flex flex-col flex-shrink justify-evenly">
          <Text className="text-xl font-bold flex-shrink leading-6">
            {loading ? dao.name : displayName}
          </Text>
          <View className="flex flex-col gap-0.5">
            <View>
              <Text className="text-sm text-grey-three">Highest Bid</Text>
              {loading ? (
                <View className="bg-grey-one rounded-md h-5 w-16" />
              ) : (
                <Text className="text-base font-bold text-black">{bid}</Text>
              )}
            </View>
            <View className="">
              <Text className="text-sm text-grey-three">Ends In</Text>
              {loading ? (
                <View className="bg-grey-one rounded-md h-5 w-24" />
              ) : (
                <Countdown
                  timestamp={endTime}
                  style="text-base font-bold text-black"
                  endText="Ended"
                />
              )}
            </View>
          </View>
        </View>
        {activeSearch && (
          <TouchableOpacity
            className="absolute h-full z-10"
            activeOpacity={0.8}
            onPress={saveOrUnSave}>
            <View className="absolute bottom-0 left-0 h-12 w-12 bg-grey-one/95 rounded-tr-lg rounded-bl-lg flex items-center justify-center">
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
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  className="stroke-black w-6 h-6">
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
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
