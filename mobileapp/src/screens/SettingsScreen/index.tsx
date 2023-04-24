import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeTabScreenProps } from '../../navigation/types'

const SettingsScreen = ({
  route,
  navigation
}: HomeTabScreenProps<'Settings'>) => {
  return (
    <View className="h-full bg-white">
      <SafeAreaView>
        <View className="mx-4 mt-6 flex flex-col h-full">
          <View className="flex flex-row">
            <Text className="text-4xl font-extrabold">Settings</Text>
          </View>
          <View className="my-auto mx-auto pb-20 max-w-[160px] text-center">
            <Text className="max-w-[160px] text-center">
              Nothing here just yet!
            </Text>
            <Text className="mt-2 text-center">⌐◨-◨</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default SettingsScreen
