import { useWeb3Modal } from '@web3modal/react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import ConnectWalletButton from '../ConnectWalletButton'
import { ethers, TypedDataDomain, TypedDataField } from 'ethers'

const WalletSection = ({}) => {
  const { isOpen, open, close, provider, isConnected } = useWeb3Modal()

  const [address, setAddress] = useState<string | null>(null)

  // const web3Provider = useMemo(
  //   () => (provider ? new ethers.BrowserProvider(provider) : undefined),
  //   [provider]
  // )

  // useEffect(() => {
  //   const getAddress = async () => {
  //     if (web3Provider) {
  //       const [address] = await web3Provider.listAccounts()
  //       setAddress(address.address)
  //     }
  //   }
  //   getAddress()
  // }, [web3Provider])

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
      {address && (
        <View className="mt-4 -mx-4">
          <Text className="text-xl font-bold">Address</Text>
          <Text className="text-sm">{address}</Text>
        </View>
      )}
      <ConnectWalletButton />
    </View>
  )
}

export default WalletSection
