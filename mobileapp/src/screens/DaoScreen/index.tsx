import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { RootStackScreenProps } from '../../navigation/types'
import clsx from 'clsx'
import DaoCardImage from '../../components/DaoCardImage'
import Countdown from '../../components/Countdown'
import Svg, { Path } from 'react-native-svg'

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

  const displayName = `${dao.name} #${dao.auction.id}`
  const bid = `${dao.auction.highestBid} Ξ`

  return (
    <View className="h-full bg-white">
      <SafeAreaView>
        <View className="mx-4 h-full">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            className="mb-6 mt-3">
            <View className="bg-grey-one h-12 w-12 rounded-lg justify-center items-center">
              <Svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-6 h-6 stroke-black">
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          <View className="bg-grey-one rounded-lg w-full aspect-square">
            <DaoCardImage
              daoAddress={dao.address}
              metadataAddress={dao.metadata}
              tokenId={dao.auction.id}
            />
          </View>
          <View className="mt-3">
            <Text className="text-3xl font-bold truncate">{displayName}</Text>
            <View className="mt-3 flex flex-row">
              <View className="w-1/2">
                <Text className="text-grey-three">Highest Bid</Text>
                <Text className="text-xl font-bold text-black">{bid}</Text>
              </View>
              <View className="w-1/2 pl-[16%]">
                <Text className="text-grey-three">Ends In</Text>
                <Countdown
                  timestamp={dao.auction.endTime}
                  style="text-xl font-bold text-black"
                  endText="Ended"
                />
              </View>
            </View>
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
                <Text className="text-black">Save back</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DaoScreen
