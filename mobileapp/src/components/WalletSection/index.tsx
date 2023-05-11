import { useWeb3Modal } from '@web3modal/react-native'
import React, { useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import ConnectWalletButton from '../ConnectWalletButton'

const WalletSection = ({}) => {
  const { isOpen, open, close, provider, isConnected } = useWeb3Modal()

  return (
    <View className="flex flex-col">
      <View className="w-full bg-grey-one/70 rounded-lg p-4 mb-3">
        <Text className="text-xl font-bold">Add your wallet</Text>
        <Text className="">Connect to automatically follow your Daos</Text>
        {!isConnected && (
          <View className="mt-4 -mx-4">
            {/* TODO: dynamically set image size */}
            <Image
              className="max-w-full h-[84px]"
              source={require('../../assets/img/dao-examples-horizontal.png')}
            />
          </View>
        )}
      </View>
      <ConnectWalletButton />
    </View>
  )
}

export default WalletSection
