import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { HomeTabScreenProps } from '../../navigation/types'
import DaoSearch from '../../components/DaoSearch'
import { useDaoSearchStore } from '../../store/daoSearch'
import DaoCard from '../../components/DaoCard'
import SearchButton from '../../components/SearchButton'
import { useEffect, useReducer } from 'react'
import { useAddressesStore } from '../../store/addresses'
import { loadDaosForAddresses } from '../../data/addressDaos'
import React from 'react'
import { IntroNextAction, IntroStage, useIntroStore } from '../../store/intro'

const DaosScreen = ({ route, navigation }: HomeTabScreenProps<'Daos'>) => {
  const insets = useSafeAreaInsets()

  const introStage = useIntroStore(state => state.stage)
  const introNextAction = useIntroStore(state => state.nextAction)
  const setIntroNextAction = useIntroStore(state => state.setNextAction)

  const savedDaos = useDaosStore(state => state.saved)
  const saveMultiple = useDaosStore(state => state.saveMultiple)

  const searchDaos = useDaoSearchStore(state => state.searchResults)
  const searchActive = useDaoSearchStore(state => state.active)
  const setSearchActive = useDaoSearchStore(state => state.setActive)
  const setSearchFocusRequested = useDaoSearchStore(
    state => state.setFocusRequested
  )

  const savedManualAddresses = useAddressesStore(state => state.manualAddresses)

  const [refreshing, setRefreshing] = React.useState(false)
  const [reloadKey, reloadData] = useReducer(x => x + 1, 0)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    reloadData()
    const reloadTime = savedDaos.length > 0 ? 2000 : 400
    setTimeout(() => {
      setRefreshing(false)
    }, reloadTime)
  }, [savedDaos])

  useEffect(() => {
    if (introNextAction === IntroNextAction.SEARCH_DAO) {
      setSearchFocusRequested(true)
      setSearchActive(true)
      setIntroNextAction(IntroNextAction.NONE)
    }
  }, [introNextAction])

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

  useEffect(() => {
    if (introStage !== IntroStage.DONE) {
      navigation.navigate('Intro')
    }
  }, [introStage, navigation])

  const daos = searchActive && searchDaos.length > 0 ? searchDaos : savedDaos

  return (
    <ScrollView
      className="flex flex-col h-full bg-white"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={['#CCCCCC']}
          tintColor={'#CCCCCC'}
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={insets.top}
        />
      }>
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
              renderItem={({ item }) => (
                <DaoCard key={`${item.address}-${reloadKey}`} dao={item} />
              )}
              keyExtractor={item => item.address}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View className="mx-auto mt-[80%] max-w-[160px] text-center">
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
