import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SearchDao, useDaoSearchStore } from '../../store/daoSearch'
import { SavedDao } from '../../store/daos'
import Countdown from '../Countdown'
import DaoCardImage from '../DaoCardImage'
import { useNavigation } from '@react-navigation/native'
import { DAO } from '../../utils/types'
import clsx from 'clsx'
import useAuction from '../../hooks/useAuction'
import SaveDaoIconButton from '../SaveDaoIconButton'
import { formatBid } from '../../utils/format'

type DaoCardProps = {
  dao: SavedDao | SearchDao
}

const DaoCard = ({ dao }: DaoCardProps) => {
  const navigation = useNavigation()
  const activeSearch = useDaoSearchStore(state => state.active)

  const { loading, error, auction } = useAuction(dao.address)

  if (error || !auction)
    return (
      <View className="flex flex-row items-center mb-3">
        <View className="bg-grey-one rounded-lg w-36 h-36" />
        <View className="ml-4">
          <Text
            className={clsx('text-xl font-bold', error && 'text-grey-four')}>
            {error ? `Couldn't load Dao` : dao.name}
          </Text>
          <View className="pt-4 flex flex-col gap-2">
            <Text className={clsx(error && 'text-grey-four')}>
              {error ? `Try to refresh later` : `No tokens minted yet`}
            </Text>
            <View className="bg-grey-one rounded-md h-5 w-20" />
            <View className="bg-grey-one rounded-md h-5 w-16" />
          </View>
        </View>
      </View>
    )

  const tokenId = auction.token.tokenId
  const highestBid = formatBid(auction?.highestBid?.amount || '0')
  const endTime = auction.endTime

  const displayName = auction.token.name
  const bid = `${highestBid} Ξ`

  const openDaoPage = () => {
    // Dao page won't open if dao was created,
    // but no token was minted yet
    if (auction) {
      const daoData: DAO = {
        name: dao.name,
        address: dao.address,
        auction: auction
      }

      navigation.navigate('Dao', {
        dao: daoData
      })
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={openDaoPage}>
      <View className="relative box-border w-full flex flex-row items-center mb-3 rounded-lg">
        <View className="bg-grey-one/60 rounded-lg w-36 h-36">
          {auction && (
            <DaoCardImage
              daoAddress={dao.address}
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
        {activeSearch && <SaveDaoIconButton dao={dao} />}
      </View>
    </TouchableOpacity>
  )
}

export default DaoCard
