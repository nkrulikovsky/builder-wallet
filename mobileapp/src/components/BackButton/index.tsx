import { Pressable, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const BackButton = ({ onPress }: { onPress: () => void }) => (
  <Pressable onPress={onPress} className="mb-6 mt-3">
    <View className="bg-grey-one h-12 w-12 rounded-lg justify-center items-center">
      <Svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="w-6 h-6 stroke-black">
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </Svg>
    </View>
  </Pressable>
)

export default BackButton
