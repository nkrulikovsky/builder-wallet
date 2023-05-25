import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Clipboard from '@react-native-clipboard/clipboard'
import { getAddress, isAddress } from 'viem'
import { useAddressesStore } from '../../store/addresses'
import { fetchEnsAddress } from '@wagmi/core'
import { IntroNextAction, useIntroStore } from '../../store/intro'

const AddAddressButton = ({}) => {
  const introNextAction = useIntroStore(state => state.nextAction)
  const setIntroNextAction = useIntroStore(state => state.setNextAction)

  const addAddress = useAddressesStore(state => state.addManualAddress)

  const [modalVisible, setModalVisible] = useState(false)
  const [addressText, setAddressText] = useState('')
  const [checkingEns, setCheckingEns] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (introNextAction === IntroNextAction.ADD_WALLET) {
      setModalVisible(true)
      setIntroNextAction(IntroNextAction.NONE)
    }
  }, [introNextAction])

  const handleChangeText = (text: any) => {
    setAddressText(String(text).trim())
  }

  const pasteClipboardData = async () => {
    const text = await Clipboard.getString()
    if (text) {
      setAddressText(text)
    }
  }

  const setAddressAndClose = (address: string) => {
    addAddress(getAddress(address))
    setAddressText('')
    setModalVisible(false)
    setError(undefined)
  }

  const closeAndReset = () => {
    setAddressText('')
    setModalVisible(false)
    setError(undefined)
  }

  const onConfirm = async () => {
    if (addressText.endsWith('.eth') && !checkingEns) {
      setCheckingEns(true)
      const address = await fetchEnsAddress({
        name: addressText
      })
      setCheckingEns(false)

      if (address) {
        setAddressAndClose(address)
      } else {
        setError(`Couldn't find ENS name`)
      }
    } else if (isAddress(addressText)) {
      setAddressAndClose(addressText)
    }
  }

  const validAddressOrEns =
    isAddress(addressText) === true || addressText.endsWith('.eth')

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <KeyboardAvoidingView behavior="position">
          <Pressable onPress={closeAndReset}>
            <View className="h-full w-full bg-grey-three/30">
              <Pressable
                onPress={() => {}}
                className="bg-white rounded-lg absolute bottom-0 left-0 right-0">
                <View className="flex flex-col gap-3 pt-3 pb-5 px-4">
                  <Text className="text-lg font-bold text-center">
                    Enter Ethereum Address
                  </Text>
                  <View className="flex flex-col gap-px">
                    <View className="flex flex-row h-12 bg-grey-one rounded-lg justify-between items-center">
                      <View className="w-[88%] pl-4">
                        <TextInput
                          autoFocus={true}
                          autoCapitalize="none"
                          autoCorrect={false}
                          autoComplete="off"
                          onChangeText={handleChangeText}
                          value={addressText}
                          placeholder="Address or ENS name"
                        />
                      </View>
                      <Pressable
                        className="h-12 w-12 items-center justify-center flex-none"
                        onPress={pasteClipboardData}>
                        <Svg
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="w-6 h-6 stroke-grey-four">
                          <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                          />
                        </Svg>
                      </Pressable>
                    </View>
                    {error && <Text className="-mt-2 text-red">{error}</Text>}
                  </View>
                  <Pressable onPress={onConfirm}>
                    <View
                      className={clsx(
                        'h-12 w-full rounded-lg items-center justify-center text-center',
                        validAddressOrEns && !checkingEns
                          ? 'bg-black'
                          : 'bg-grey-two'
                      )}>
                      <Text
                        className={
                          validAddressOrEns && !checkingEns
                            ? 'text-white'
                            : 'text-grey-four'
                        }>
                        {checkingEns ? 'Checking...' : 'Confirm'}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </Pressable>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
      <Pressable
        onPress={() => {
          setModalVisible(true)
        }}>
        <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
          <Text className="text-white">Add</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default AddAddressButton
