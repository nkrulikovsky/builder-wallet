import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { RootStackScreenProps } from '../../navigation/types'
import clsx from 'clsx'
import DaoCardImage from '../../components/DaoCardImage'
import Countdown from '../../components/Countdown'
import BackButton from '../../components/BackButton'
import dayjs from 'dayjs'

const DaoScreen = ({ route, navigation }: RootStackScreenProps<'Dao'>) => {
  const { dao } = route.params
  const savedDaos = useDaosStore(state => state.saved)
  const removeFromSaved = useDaosStore(state => state.removeFromSaved)
  const save = useDaosStore(state => state.save)

  const daoIsSaved = savedDaos.some(
    savedDao => savedDao.address === dao.address
  )

  const saveOrUnsave = () => {
    if (daoIsSaved) removeFromSaved(dao.address)
    else save(dao)
  }

  const bidOnToken = () => {
    navigation.navigate('Bid', { dao })
  }

  const displayName = `${dao.name} #${dao.auction.id}`
  const bid = `${dao.auction.highestBid} Ξ`

  return (
    <View className="h-full bg-white">
      <SafeAreaView>
        <View className="mx-4 h-full">
          <BackButton onPress={() => navigation.goBack()} />
          <View className="bg-grey-one rounded-lg w-full aspect-square">
            <DaoCardImage
              daoAddress={dao.address}
              metadataAddress={dao.metadata}
              tokenId={dao.auction.id}
            />
          </View>
          <View className="mt-4">
            <Text className="text-3xl font-bold truncate">{displayName}</Text>
            <View className="mt-3 flex flex-row">
              <View className="w-1/2">
                <Text className="text-grey-three">Highest Bid</Text>
                <Text className="text-xl font-bold text-black">{bid}</Text>
              </View>
              <View className="w-1/2 pl-[10%]">
                <Text className="text-grey-three">Ends In</Text>
                <Countdown
                  timestamp={dao.auction.endTime}
                  style="text-xl font-bold text-black"
                  endText="Ended"
                />
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={bidOnToken}
              className="mt-4">
              <View className="bg-black h-12 w-full rounded-lg items-center justify-center">
                <Text className="text-white font-bold">
                  {dayjs().isBefore(dao.auction.endTime)
                    ? 'Place bid in browser'
                    : 'Settle in browser'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={saveOrUnsave}
            className="mb-3 mt-3 absolute bottom-0 w-full">
            <View
              className={clsx(
                'border border-opacity-30 h-12 w-full rounded-lg items-center justify-center',
                daoIsSaved ? 'border-red' : 'border-grey-three'
              )}>
              {daoIsSaved ? (
                <Text className="text-red">Remove from saved</Text>
              ) : (
                <Text className="text-black">Save</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DaoScreen
