import { Linking, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '../../navigation/types'
import BackButton from '../../components/BackButton'
import Svg, { Path } from 'react-native-svg'
import Section from '../../components/Section'

const appleVideoGuideUrl = 'https://www.youtube.com/watch?v=x49NAAOQyRA'

const WidgetsSetupInfoScreen = ({
  route,
  navigation
}: RootStackScreenProps<'WidgetsSetupInfo'>) => {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView>
        <View className="mx-4">
          <BackButton onPress={() => navigation.goBack()} />
          <Section title="Adding Widgets">
            <Text className="text-base mb-3">
              Here are the steps to add widgets to your Home screen:
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
              5. Right after adding the widget, tap on it to customize and
              select Dao for this widget.
            </Text>
            <Text className="text-base mb-2">
              6. Tap Done to save your settings.
            </Text>
          </Section>
          <Section title="Video" className="mt-6">
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={async () => {
                if (await Linking.canOpenURL(appleVideoGuideUrl)) {
                  await Linking.openURL(appleVideoGuideUrl)
                }
              }}>
              <View className="h-12 w-full px-4 border border-grey-four rounded-lg items-center justify-between text-center flex flex-row">
                <Text className="text-black">Guide from Apple Support</Text>
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-6 h-6 stroke-grey-four">
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </Svg>
              </View>
            </TouchableOpacity>
          </Section>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default WidgetsSetupInfoScreen
