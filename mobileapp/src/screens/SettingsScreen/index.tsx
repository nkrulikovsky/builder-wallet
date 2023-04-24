import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SettingsScreen = ({
  route,
  navigation
}: {
  navigation: any
  route: any
}) => {
  return (
    <View className="h-full bg-white">
      <SafeAreaView>
        <View className="mx-4 mt-6 flex flex-col h-full">
          <View className="flex flex-row">
            <Text className="text-4xl font-extrabold">Settings</Text>
          </View>
          <Text className="my-auto mx-auto pb-20 max-w-[160px] text-center">
            Modify some stuff here
          </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default SettingsScreen
