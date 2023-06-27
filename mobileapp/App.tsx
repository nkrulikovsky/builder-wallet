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
import { StatusBar } from 'react-native'
import { WagmiConfig } from 'wagmi'

import { wagmiConfig } from './src/constants/viemWagmi'
import IntroScreen from './src/screens/IntroScreen'
import WidgetsSetupInfoScreen from './src/screens/WidgetsSetupInfoScreen'
import AppToast from './src/components/AppToast'
import { mixpanel } from './src/constants/mixpanel'

mixpanel.init()
mixpanel.setUseIpAddressForGeolocation(false)

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
              <RootStack.Screen
                name="WidgetsSetupInfo"
                component={WidgetsSetupInfoScreen}
                options={{ headerShown: false }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </WagmiConfig>
      </ApolloProvider>
      <AppToast />
    </>
  )
}

export default App
