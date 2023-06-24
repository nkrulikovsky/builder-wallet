import React from 'react'
import { Image, Text, View } from 'react-native'
import { useAddressesStore } from '../../store/addresses'
import AddAddressButton from '../AddAddressButton'
import AddressesList from '../AddressesList'

const WalletSection = ({}) => {
  const manualAddresses = useAddressesStore(state => state.manualAddresses)

  const anyManualAddresses = manualAddresses.length > 0

  return (
    <View className="flex flex-col">
      {anyManualAddresses ? (
        <View className="flex flex-col">
          <Text className="text-2xl font-bold mb-1">Wallets</Text>
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
      <AddAddressButton />
    </View>
  )
}

export default WalletSection
