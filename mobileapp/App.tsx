import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import type { PropsWithChildren } from 'react'
import { View, useColorScheme } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import zoraClient from './src/data/zoraClient'
import DaosScreen from './src/screens/DaosScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

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
