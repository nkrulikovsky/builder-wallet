import { Image, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '../../navigation/types'
import { IntroStage, useIntroStore } from '../../store/intro'
import { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'

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
        <View className="h-full">
          <View className="mt-1">
            <Image
              className="w-full h-[90%]"
              source={require('../../assets/img/dao-images-grid.png')}
            />
          </View>
          <View className="absolute bottom-0 left-0 right-0">
            <LinearGradient
              locations={[0, 0.42]}
              colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
              className="flex flex-col gap-3 px-4 pb-3 pt-32">
              <Text className="text-black font-extrabold text-4xl -mb-1">
                Add DAOs
              </Text>
              <Text className="text-black text-lg">
                Add your wallet to automatically load all your DAOs or search
                for your DAOs manually
              </Text>
              <Pressable
                onPress={() => {
                  // TODO
                  setIntroStage(IntroStage.DONE)
                }}>
                <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
                  <Text className="text-white">Add Wallet</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  // TODO
                  setIntroStage(IntroStage.DONE)
                }}>
                <View className="h-12 w-full bg-grey-one rounded-lg items-center justify-center text-center">
                  <Text className="text-black">Search</Text>
                </View>
              </Pressable>
            </LinearGradient>
          </View>
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
