import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import ConnectWalletButton from '../ConnectWalletButton'
import { useAddressesStore } from '../../store/addresses'
import AddAddressButton from '../AddAddressButton'
import AddressesList from '../AddressesList'

const WalletSection = ({}) => {
  const manualAddresses = useAddressesStore(state => state.manualAddresses)

  // const { isOpen, open, close, provider, isConnected } = useWeb3Modal()
  // useEffect(() => {
  //   const getAddress = async () => {
  //     const web3Provider = provider
  //       ? new ethers.BrowserProvider(provider)
  //       : null

  //     if (web3Provider) {
  //       const [address] = await web3Provider.listAccounts()
  //       const shortAddress = `${address.address.slice(
  //         0,
  //         18
  //       )}...${address.address.slice(address.address.length - 18)}`
  //       setAddress(shortAddress)
  //     }
  //   }

  //   if (isConnected && provider) {
  //     getAddress()
  //   }
  // }, [provider, isConnected])

  const anyManualAddresses = manualAddresses.length > 0

  return (
    <View className="flex flex-col">
      {anyManualAddresses ? (
        <View className="flex flex-col">
          <Text className="text-xl font-bold mb-1">Wallets</Text>
          <AddressesList />
        </View>
      ) : (
        <View className="w-full bg-grey-one/70 rounded-lg p-4 mb-3">
          <Text className="text-xl font-bold">Add your wallet</Text>
          <Text className="">To automatically follow your Daos</Text>
          <View className="mt-4 -mx-4">
            {/* TODO: dynamically set image size */}
            <Image
              className="max-w-full h-[84px]"
              source={require('../../assets/img/dao-examples-horizontal.png')}
            />
          </View>
        </View>
      )}
      {/* <ConnectWalletButton /> */}
      <AddAddressButton />
    </View>
  )
}

export default WalletSection
