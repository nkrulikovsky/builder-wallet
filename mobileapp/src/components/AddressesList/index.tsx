import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { useAddressesStore } from '../../store/addresses'
import Svg, { Path } from 'react-native-svg'
import clsx from 'clsx'
import { shorterAddress } from '../../utils/address'

const AddressesList = ({}) => {
  const manualAddresses = useAddressesStore(state => state.manualAddresses)
  const removeManualAddress = useAddressesStore(
    state => state.removeManualAddress
  )

  const oneAddress = manualAddresses.length === 1
  const manyAddresses = manualAddresses.length > 1

  return (
    <View className="h-min mb-3 flex flex-col">
      <FlatList
        data={manualAddresses}
        renderItem={({ item, index }) => (
          <View
            className={clsx(
              'flex flex-row h-12 w-full bg-grey-one justify-between items-center',
              manyAddresses && index === 0 && 'rounded-t-lg',
              manyAddresses &&
                index === manualAddresses.length - 1 &&
                'rounded-b-lg',
              oneAddress && 'rounded-lg',
              manyAddresses &&
                index !== manualAddresses.length - 1 &&
                'border-b border-grey-two/60'
            )}>
            <View className="grow px-4">
              <Text className="text-ellipsis">
                {shorterAddress(String(item))}
              </Text>
            </View>
            <Pressable
              className="h-12 w-12 items-center justify-center flex-none"
              onPress={() => removeManualAddress(String(item))}>
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
        )}
        keyExtractor={item => `${item}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default AddressesList
