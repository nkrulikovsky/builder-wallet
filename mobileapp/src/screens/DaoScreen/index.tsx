import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { RootStackScreenProps } from '../../navigation/types'
import DaoCard from '../../components/DaoCard'

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

  return (
    <View className="h-full bg-white">
      <SafeAreaView>
        <View className="mx-4">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            className="mb-3 mt-3">
            <View className="bg-grey-one h-12 w-12 rounded-lg"></View>
          </TouchableOpacity>
          <DaoCard dao={dao} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={saveOrUnsave}
            className="mb-3 mt-3">
            <View className="border-2 border-opacity-30 border-red h-12 w-full rounded-lg items-center justify-center">
              {daoIsSaved ? (
                <Text className="text-red">Remove from saved</Text>
              ) : (
                <Text className="text-red">Save back</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DaoScreen
