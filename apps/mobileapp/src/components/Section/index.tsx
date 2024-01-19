import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { Text, View } from 'react-native'

type SectionProps = {
  title: string
  children?: ReactNode
  className?: string
}

const Section = ({ title, children, className }: SectionProps) => {
  return (
    <View className={clsx('flex flex-col', className)}>
      <Text className="text-2xl font-bold mb-4">{title}</Text>
      {children}
    </View>
  )
}

export default Section
