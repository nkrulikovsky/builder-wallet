import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'

import zoraClient from './src/data/zoraClient'
import DaosScreen from './src/screens/DaosScreen'
import { useColorScheme } from 'nativewind'

// import type { PropsWithChildren } from 'react'

const Stack = createNativeStackNavigator()

const App = () => {
  const { setColorScheme } = useColorScheme()

  useEffect(() => {
    setColorScheme('dark')
  }, [setColorScheme])

  return (
    <ApolloProvider client={zoraClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Daos"
            component={DaosScreen}
            options={{ headerShown: false, statusBarHidden: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App
