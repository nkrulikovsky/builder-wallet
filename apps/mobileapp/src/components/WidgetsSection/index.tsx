import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Section from '../Section'

type WidgetsSectionProps = {
  className?: string
}

const WidgetsSection = ({ className }: WidgetsSectionProps) => {
  const navigation = useNavigation()

  return (
    <Section title="Widgets" className={className}>
      <View className="flex flex-col gap-3">
        <Text>Learn how to add and configure widgets for your Dao</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('WidgetsSetupInfo')
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
        </TouchableOpacity>
      </View>
    </Section>
  )
}

export default WidgetsSection
