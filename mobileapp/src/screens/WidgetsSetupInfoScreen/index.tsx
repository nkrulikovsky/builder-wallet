import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '../../navigation/types'
import BackButton from '../../components/BackButton'

const WidgetsSetupInfoScreen = ({
  route,
  navigation
}: RootStackScreenProps<'WidgetsSetupInfo'>) => {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView>
        <View className="mx-4">
          <BackButton onPress={() => navigation.goBack()} />
          <View className="mb-3">
            <Text className="text-4xl font-extrabold">Adding Widgets</Text>
          </View>
          <Text className="text-lg mb-3">
            Here are the steps to add widgets to your Home screen on iOS:
          </Text>
          <Text className="text-base mb-2">
            1. Touch and hold an empty area on your Home Screen.
          </Text>
          <Text className="text-base mb-2">
            2. Tap the plus icon (+) on the top left corner.
          </Text>
          <Text className="text-base mb-2">
            3. Scroll down and select Builder app from the list.
          </Text>
          <Text className="text-base mb-2">
            4. Choose the widget and tap Add Widget.
          </Text>
          <Text className="text-base mb-2">
            5. Right after adding the widget, tap on it to customize and select
            Dao for this widget.
          </Text>
          <Text className="text-base mb-2">
            6. Tap Done to save your settings.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default WidgetsSetupInfoScreen
