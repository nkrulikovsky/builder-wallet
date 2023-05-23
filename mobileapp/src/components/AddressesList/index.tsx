import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useAddressesStore } from '../../store/addresses'

const AddressesList = ({}) => {
  const manualAddresses = useAddressesStore(state => state.manualAddresses)

  const manyAddresses = manualAddresses.length > 1

  return (
    // <Pressable
    //   onPress={() => {
    //     // open()
    //   }}>
    //   <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
    //     <Text className="text-white">Add</Text>
    //   </View>
    // </Pressable>
    <View className="h-12 w-full bg-grey-one/70 rounded-lg px-4 mb-3 justify-center">
      <Text className="text-sm">{manualAddresses[0]}</Text>
    </View>
  )
}

export default AddressesList
