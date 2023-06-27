import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { View, TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'

const DaosIcon = ({ isFocused }: { isFocused: boolean }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke={isFocused ? '#000000' : '#9D9D9D'}
    className="w-6 h-6">
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </Svg>
)

const SettingsIcon = ({ isFocused }: { isFocused: boolean }) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={isFocused ? '#000000' : '#9D9D9D'}
      className="w-6 h-6">
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </Svg>
  )
}

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View className="flex flex-row h-20 pt-1 bg-white justify-evenly border-t border-grey-one">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="h-12 w-12 items-center justify-center">
            <View>
              {route.name === 'Daos' ? (
                <DaosIcon isFocused={isFocused} />
              ) : route.name === 'Settings' ? (
                <SettingsIcon isFocused={isFocused} />
              ) : (
                <View />
              )}
              {isFocused && (
                <View className="mt-1.5 bg-black h-1 w-1 rounded-full mx-auto" />
              )}
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default TabBar
