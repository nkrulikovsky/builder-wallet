import { useWeb3Modal } from '@web3modal/react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import ConnectWalletButton from '../ConnectWalletButton'
import { ethers, TypedDataDomain, TypedDataField } from 'ethers'

const WalletSection = ({}) => {
  const { isOpen, open, close, provider, isConnected } = useWeb3Modal()

  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    const getAddress = async () => {
      const web3Provider = provider
        ? new ethers.BrowserProvider(provider)
        : null

      if (web3Provider) {
        const [address] = await web3Provider.listAccounts()
        const shortAddress = `${address.address.slice(
          0,
          18
        )}...${address.address.slice(address.address.length - 18)}`
        setAddress(shortAddress)
      }
    }

    if (isConnected && provider) {
      getAddress()
    }
  }, [provider, isConnected])

  return (
    <View className="flex flex-col">
      {!isConnected && (
        <View className="w-full bg-grey-one/70 rounded-lg p-4 mb-3">
          <Text className="text-xl font-bold">Add your wallet</Text>
          <Text className="">Connect to automatically follow your Daos</Text>
          <View className="mt-4 -mx-4">
            {/* TODO: dynamically set image size */}
            <Image
              className="max-w-full h-[84px]"
              source={require('../../assets/img/dao-examples-horizontal.png')}
            />
          </View>
        </View>
      )}
      {isConnected && address && (
        <View className="h-12 w-full bg-grey-one/70 rounded-lg px-4 mb-3 justify-center">
          <Text className="text-sm">{address}</Text>
        </View>
      )}
      <ConnectWalletButton />
    </View>
  )
}

export default WalletSection
