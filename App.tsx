/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './src/views/Home';
import { Scanner } from './src/views/Scanner';
import { Credentials } from './src/views/Credentials';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{ title: 'Scan' }}
        />
        <Stack.Screen name="Credentials" component={Credentials} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
