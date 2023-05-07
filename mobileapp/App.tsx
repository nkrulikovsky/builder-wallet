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

// import type { PropsWithChildren } from 'react'

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
    <ApolloProvider client={zoraClient}>
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
        </RootStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App
