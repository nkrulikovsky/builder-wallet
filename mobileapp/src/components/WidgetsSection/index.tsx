import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const WidgetsSection = ({}) => {
  return (
    <View className="flex flex-col mt-6">
      <Text className="text-2xl font-bold mb-1">Widgets</Text>
      <View className="flex flex-col gap-3">
        <Text>Learn how to add and configure widgets for your Dao</Text>
        <Pressable
          onPress={() => {
            // TODO: navigate to widgets info screen
          }}>
          <View className="h-12 w-full px-4 bg-grey-one rounded-lg items-center justify-between text-center flex flex-row">
            <Text className="text-black">Adding Widgets</Text>
            <Svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-6 h-6 stroke-black">
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </Svg>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default WidgetsSection
