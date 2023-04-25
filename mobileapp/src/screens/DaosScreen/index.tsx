import { Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { HomeTabScreenProps } from '../../navigation/types'
import DaoSearch from '../../components/DaoSearch'
import { useDaoSearchStore } from '../../store/daoSearch'
import { FlashList } from '@shopify/flash-list'

const DaosScreen = ({ route, navigation }: HomeTabScreenProps<'Daos'>) => {
  const savedDaos = useDaosStore(state => state.saved)

  const searchResults = useDaoSearchStore(state => state.searchResults)
  const searchStatus = useDaoSearchStore(state => state.searchStatus)

  return (
    <View className="h-full bg-white">
      <SafeAreaView>
        <View className="mx-4 mt-6 flex flex-col h-full">
          <View className="flex flex-row">
            <Text className="text-4xl font-extrabold">DAOs</Text>
          </View>
          <DaoSearch />
          <FlashList
            data={searchResults}
            renderItem={({ item }) => <Text>{item.name}</Text>}
            keyExtractor={item => item.address}
            estimatedItemSize={200}
          />
          {savedDaos.length === 0 && (
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
