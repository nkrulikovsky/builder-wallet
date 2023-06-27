import type {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { DAO } from '../utils/types'

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>
  Dao: { dao: DAO }
  Intro: undefined
  WidgetsSetupInfo: undefined
}

export type HomeTabParamList = {
  Daos: undefined
  Feed: undefined
  Settings: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
