import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { HomeTabScreenProps } from '../../navigation/types'
import DaoSearch from '../../components/DaoSearch'
import { useDaoSearchStore } from '../../store/daoSearch'
import { FlashList } from '@shopify/flash-list'
import DaoCard from '../../components/DaoCard'

const DaosScreen = ({ route, navigation }: HomeTabScreenProps<'Daos'>) => {
  const savedDaos = useDaosStore(state => state.saved)
  const searchDaos = useDaoSearchStore(state => state.searchResults)

  const daos = [...searchDaos, ...savedDaos]

  return (
    <View className="h-full bg-white">
      <SafeAreaView>
        <View className="mx-4 mt-6 flex flex-col h-full">
          <View className="flex flex-row">
            <Text className="text-4xl font-extrabold">DAOs</Text>
          </View>
          <DaoSearch />
          {daos.length > 0 ? (
            <FlashList
              data={daos}
              renderItem={({ item }) => <DaoCard dao={item} />}
              keyExtractor={item => item.address}
              estimatedItemSize={200}
            />
          ) : (
            <View className="my-auto mx-auto pb-12 max-w-[160px] text-center">
              <Text className="max-w-[160px] text-center">
                Add some DAOs to enable widgets!
              </Text>
              <Text className="mt-2 text-center">⌐◨-◨</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DaosScreen
