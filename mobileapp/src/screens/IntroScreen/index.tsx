import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { RootStackScreenProps } from '../../navigation/types'
import clsx from 'clsx'
import DaoCardImage from '../../components/DaoCardImage'
import Countdown from '../../components/Countdown'
import Svg, { Path } from 'react-native-svg'
import { IntroStage, useIntroStore } from '../../store/intro'
import { useEffect } from 'react'

const IntroScreen = ({ route, navigation }: RootStackScreenProps<'Intro'>) => {
  const introStage = useIntroStore(state => state.stage)
  const setIntroStage = useIntroStore(state => state.setState)

  useEffect(() => {
    if (introStage === IntroStage.NOT_STARTED) {
      setIntroStage(IntroStage.AUCTIONS)
    }
  }, [introStage, setIntroStage])

  let view = <></>

  switch (introStage) {
    case IntroStage.NOT_STARTED:
      break
    case IntroStage.AUCTIONS:
      view = (
        <View className="mx-4 h-full">
          <Text>Intro. Stage AUCTIONS</Text>
          <Pressable
            onPress={() => {
              setIntroStage(IntroStage.WIDGETS)
            }}>
            <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
              <Text className="text-white">Next</Text>
            </View>
          </Pressable>
        </View>
      )
      break
    case IntroStage.WIDGETS:
      view = (
        <View className="mx-4 h-full">
          <Text>Intro. Stage WIDGETS</Text>
          <Pressable
            onPress={() => {
              setIntroStage(IntroStage.ADD_DAOS)
            }}>
            <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
              <Text className="text-white">Next</Text>
            </View>
          </Pressable>
        </View>
      )
      break
    case IntroStage.ADD_DAOS:
      view = (
        <View className="mx-4 h-full">
          <Text>Intro. Stage ADD_DAOS</Text>
          <Pressable
            onPress={() => {
              setIntroStage(IntroStage.DONE)
            }}>
            <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
              <Text className="text-white">Next</Text>
            </View>
          </Pressable>
        </View>
      )
      break
    case IntroStage.DONE:
      // TODO:
      view = (
        <View className="mx-4 h-full">
          <Text>Intro. Stage DONE</Text>
          <Pressable
            onPress={() => {
              setIntroStage(IntroStage.NOT_STARTED)
            }}>
            <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
              <Text className="text-white">Next</Text>
            </View>
          </Pressable>
        </View>
      )
      break
    default:
      // TODO:
      view = (
        <View className="mx-4 h-full">
          <Text>Intro. Stage DEFAULT</Text>
        </View>
      )
      break
  }

  return (
    <View className="h-full bg-white">
      <SafeAreaView>{view}</SafeAreaView>
    </View>
  )
}

export default IntroScreen
