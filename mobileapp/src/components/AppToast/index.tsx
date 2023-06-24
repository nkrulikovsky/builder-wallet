import { Text, View } from 'react-native'
import Toast from 'react-native-toast-message'

const AppToast = () => {
  return (
    <Toast
      position="bottom"
      bottomOffset={42}
      config={{
        error: props => (
          <View className="bg-red/90 w-11/12 rounded-lg py-2 px-4">
            <Text className="text-white font-bold text-lg">{props.text1}</Text>
          </View>
        )
      }}
    />
  )
}

export default AppToast
