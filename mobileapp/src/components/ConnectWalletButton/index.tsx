import { useWeb3Modal } from '@web3modal/react-native'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'

const ConnectWalletButton = ({}) => {
  const { isOpen, open, close, provider, isConnected } = useWeb3Modal()

  return (
    <Pressable
      onPress={() => {
        open()
      }}>
      <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
        <Text className="text-white">
          {isConnected ? 'View Account' : 'Connect'}
        </Text>
      </View>
    </Pressable>
  )
}

export default ConnectWalletButton
