import React from 'react'
import { Alert, FlatList, Pressable, Text, View } from 'react-native'
import { useAddressesStore } from '../../store/addresses'
import Svg, { Path } from 'react-native-svg'
import clsx from 'clsx'
import { shortAddress, shorterAddress } from '../../utils/address'
import { useEnsName } from 'wagmi'

type ElementProps = {
  address: string
  indexInList: number
  numberOfAddresses: number
}

const ListElement = ({
  address,
  indexInList,
  numberOfAddresses
}: ElementProps) => {
  const removeManualAddress = useAddressesStore(
    state => state.removeManualAddress
  )

  const { data: ens } = useEnsName({
    // @ts-ignore
    address: address
  })

  const removeAddress = (address: string) => {
    Alert.prompt(
      'Remove Address',
      `Are you sure you want to remove ${ens ?? shortAddress(address)}?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Remove',
          onPress: () => removeManualAddress(address),
          style: 'destructive'
        }
      ],
      'default'
    )
  }

  const oneAddress = numberOfAddresses === 1
  const manyAddresses = numberOfAddresses > 1

  return (
    <View
      className={clsx(
        'flex flex-row h-12 w-full bg-grey-one justify-between items-center',
        manyAddresses && indexInList === 0 && 'rounded-t-lg',
        manyAddresses &&
          indexInList === numberOfAddresses - 1 &&
          'rounded-b-lg',
        oneAddress && 'rounded-lg',
        manyAddresses &&
          indexInList !== numberOfAddresses - 1 &&
          'border-b border-grey-two/60'
      )}>
      <View className="w-[86%] pl-4 flex-shrink">
        <Text numberOfLines={1} className="flex-shrink">
          {ens ?? shorterAddress(address)}
        </Text>
      </View>
      <Pressable
        className="h-12 w-12 items-center justify-center flex-none"
        onPress={() => removeAddress(address)}>
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-6 h-6 stroke-grey-four">
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </Svg>
      </Pressable>
    </View>
  )
}

const AddressesList = ({}) => {
  const manualAddresses = useAddressesStore(state => state.manualAddresses)

  return (
    <View className="h-min mb-3 flex flex-col">
      <FlatList
        data={manualAddresses}
        renderItem={({ item, index }) => (
          <ListElement
            address={item}
            indexInList={index}
            numberOfAddresses={manualAddresses.length}
          />
        )}
        keyExtractor={item => `${item}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default AddressesList
