import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { RootStackScreenProps } from '../../navigation/types'
import clsx from 'clsx'
import DaoCardImage from '../../components/DaoCardImage'
import Countdown from '../../components/Countdown'
import BackButton from '../../components/BackButton'
import ProposalsSection from '../../components/ProposalsSection'
import Section from '../../components/Section'
import { isAddressEqual } from 'viem'
import Bid from '../../components/Bid'
import { formatBid } from '../../utils/format'

const DaoScreen = ({ route, navigation }: RootStackScreenProps<'Dao'>) => {
  const { dao } = route.params
  const savedDaos = useDaosStore(state => state.saved)
  const removeFromSaved = useDaosStore(state => state.removeFromSaved)
  const save = useDaosStore(state => state.save)

  const daoIsSaved = savedDaos.some(savedDao =>
    isAddressEqual(
      savedDao.address as `0x${string}`,
      dao.address as `0x${string}`
    )
  )

  const saveOrUnsave = () => {
    if (daoIsSaved) removeFromSaved(dao.address)
    else save(dao)
  }

  const displayName = dao.auction.token.name
  const highestBid = formatBid(dao.auction?.highestBid?.amount || '0')
  const bid = `${highestBid} Ξ`

  return (
    <ScrollView
      className="flex flex-col h-full bg-white"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <View className="mx-4 h-full">
          <BackButton onPress={() => navigation.goBack()} />
          <View className="bg-grey-one rounded-lg w-full aspect-square">
            <DaoCardImage
              daoAddress={dao.address}
              tokenId={dao.auction.token.tokenId}
            />
          </View>
          <View className="mt-4">
            <Text className="text-3xl font-bold flex-shrink leading-7 pt-2">
              {displayName}
            </Text>
            <View className="mt-3 flex flex-row">
              <View className="w-1/2">
                <Text className="text-grey-three">Highest Bid</Text>
                <Text className="text-xl font-bold text-black flex-shrink leading-5 pt-1.5">
                  {bid}
                </Text>
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
            {dao.auction.highestBid && (
              <Bid
                address={dao.auction?.highestBid.bidder}
                bid={dao.auction?.highestBid.amount}
                className="mt-4"
              />
            )}
          </View>
          <ProposalsSection dao={dao} className="mt-8" />
          <Section title="Actions" className="mt-8 mb-4">
            <TouchableOpacity activeOpacity={0.6} onPress={saveOrUnsave}>
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
          </Section>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default DaoScreen
