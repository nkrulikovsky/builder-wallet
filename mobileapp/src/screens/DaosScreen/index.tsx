import { FlatList, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { HomeTabScreenProps } from '../../navigation/types'
import DaoSearch from '../../components/DaoSearch'
import { useDaoSearchStore } from '../../store/daoSearch'
import { FlashList } from '@shopify/flash-list'
import DaoCard from '../../components/DaoCard'
import SearchButton from '../../components/SearchButton'
import { useEffect } from 'react'
import { useAddressesStore } from '../../store/addresses'
import { loadDaosForAddresses } from '../../data/addressDaos'

const DaosScreen = ({ route, navigation }: HomeTabScreenProps<'Daos'>) => {
  const savedDaos = useDaosStore(state => state.saved)
  const searchDaos = useDaoSearchStore(state => state.searchResults)
  const searchActive = useDaoSearchStore(state => state.active)
  const saveMultiple = useDaosStore(state => state.saveMultiple)

  const savedManualAddresses = useAddressesStore(state => state.manualAddresses)

  useEffect(() => {
    const fetchDaos = async (addresses: string[]) => {
      const daos = await loadDaosForAddresses(addresses)

      if (daos) {
        saveMultiple(daos)
      }
    }

    if (savedManualAddresses.length > 0) {
      fetchDaos(savedManualAddresses)
    }
  }, [savedManualAddresses])

  const daos = searchActive && searchDaos.length > 0 ? searchDaos : savedDaos

  return (
    <ScrollView
      className="flex flex-col h-full bg-white"
      showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View className="mx-4 mt-6 flex flex-col h-full">
          <View className="mb-3 flex flex-row items-center justify-between">
            <Text className="text-4xl font-extrabold">DAOs</Text>
            <SearchButton />
          </View>
          {searchActive && <DaoSearch />}
          {daos.length > 0 ? (
            <FlatList
              data={daos}
              renderItem={({ item }) => <DaoCard dao={item} />}
              keyExtractor={item => item.address}
              // estimatedItemSize={100}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
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
    </ScrollView>
  )
}

export default DaosScreen
