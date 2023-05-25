import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'

import zoraClient from './src/data/zoraClient'
import DaosScreen from './src/screens/DaosScreen'
import { useColorScheme } from 'nativewind'
import SettingsScreen from './src/screens/SettingsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar from './src/components/TabBar'
import { HomeTabParamList, RootStackParamList } from './src/navigation/types'
import DaoScreen from './src/screens/DaoScreen'
import { StatusBar, View } from 'react-native'
import { Web3Modal } from '@web3modal/react-native'
import { wcProviderMetadata } from './src/constants/config'
import { WagmiConfig } from 'wagmi'

// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { WALLET_CONNECT_PROJECT_ID } from '@env'
import { wagmiConfig } from './src/constants/viemWagmi'
import IntroScreen from './src/screens/IntroScreen'

const RootStack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<HomeTabParamList>()

const HomeTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Daos"
        component={DaosScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  const { setColorScheme } = useColorScheme()

  useEffect(() => {
    setColorScheme('dark')
  }, [setColorScheme])

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} />
      <Web3Modal
        projectId={WALLET_CONNECT_PROJECT_ID}
        providerMetadata={wcProviderMetadata}
      />
      <ApolloProvider client={zoraClient}>
        <WagmiConfig config={wagmiConfig}>
          <NavigationContainer>
            <RootStack.Navigator initialRouteName="Home">
              <RootStack.Screen
                name="Home"
                component={HomeTabs}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Dao"
                component={DaoScreen}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Intro"
                component={IntroScreen}
                options={{ headerShown: false }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </WagmiConfig>
      </ApolloProvider>
    </>
  )
}

export default App
