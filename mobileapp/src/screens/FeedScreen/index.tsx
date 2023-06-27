import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { HomeTabScreenProps } from '../../navigation/types'
import DaoCard from '../../components/DaoCard'
import { useEffect, useReducer } from 'react'
import React from 'react'

const FeedScreen = ({ route, navigation }: HomeTabScreenProps<'Feed'>) => {
  const insets = useSafeAreaInsets()

  const savedDaos = useDaosStore(state => state.saved)

  const [refreshing, setRefreshing] = React.useState(false)
  const [reloadKey, reloadData] = useReducer(x => x + 1, 0)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    reloadData()
    const reloadTime = savedDaos.length > 0 ? 1420 : 400
    setTimeout(() => {
      setRefreshing(false)
    }, reloadTime)
  }, [savedDaos])

  const props: any[] = []

  return (
    <ScrollView
      className="flex flex-col h-full bg-white"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
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
            <Text className="text-4xl font-extrabold">Feed</Text>
          </View>
          {props.length > 0 ? (
            <FlatList
              data={props}
              renderItem={({ item }) => (
                <DaoCard key={`${item.address}-${reloadKey}`} dao={item} />
              )}
              keyExtractor={item => item.address}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            <View className="mx-auto mt-[80%] max-w-[160px] text-center">
              <Text className="max-w-[160px] text-center">
                No active or pending proposals!
              </Text>
              <Text className="mt-2 text-center">⌐◨-◨</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default FeedScreen
