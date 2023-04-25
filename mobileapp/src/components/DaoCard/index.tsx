import React from 'react'
import { Text, View } from 'react-native'
import { SearchDao } from '../../store/daoSearch'
import { SavedDao } from '../../store/daos'

type DaoCardProps = {
  dao: SavedDao | SearchDao
}

const DaoCard = ({ dao }: DaoCardProps) => {
  return (
    <View className="flex flex-row items-center justify-between bg-white rounded-lg shadow-lg p-4 mb-4">
      <View className="flex flex-row items-center">
        <View className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
          <Text className="text-2xl font-bold">{dao.name[0]}</Text>
        </View>
        <View className="ml-4">
          <Text className="text-lg font-bold">{dao.name}</Text>
          <Text className="text-sm text-gray-500">{dao.address}</Text>
        </View>
      </View>
      <View className="flex flex-row items-center">
        <View className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
          <Text className="text-xl font-bold">+</Text>
        </View>
      </View>
    </View>
  )
}

export default DaoCard
