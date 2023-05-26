import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '../../navigation/types'

const WidgetsSetupInfoScreen = ({
  route,
  navigation
}: RootStackScreenProps<'WidgetsSetupInfo'>) => {
  return (
    <View className="h-full bg-white">
      <SafeAreaView>
        <View className="mx-4 mt-6 flex flex-col h-full">
          <View className="mb-3 flex flex-row">
            <Text className="text-4xl font-extrabold">Widgets Setup</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default WidgetsSetupInfoScreen
