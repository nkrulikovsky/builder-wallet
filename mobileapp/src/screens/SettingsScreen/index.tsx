import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeTabScreenProps } from '../../navigation/types'
import WalletSection from '../../components/WalletSection'

const SettingsScreen = ({
  route,
  navigation
}: HomeTabScreenProps<'Settings'>) => {
  return (
    <View className="h-full bg-white">
      <SafeAreaView>
        <View className="mx-4 mt-6 flex flex-col h-full">
          <View className="mb-3 flex flex-row">
            <Text className="text-4xl font-extrabold">Settings</Text>
          </View>
          <WalletSection />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default SettingsScreen
