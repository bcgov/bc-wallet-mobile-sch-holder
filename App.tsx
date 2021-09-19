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
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './src/views/Home';
import { Scanner } from './src/views/Scanner';
import { Credentials } from './src/views/Credentials';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const Stack = createNativeStackNavigator();
  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Scanner"
            component={Scanner}
            options={{
              title: 'Scan',
              headerLeft: () => (
                <Button
                  title="Home"
                  onPress={() => navigationRef.navigate('Home')}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Credentials"
            component={Credentials}
            options={{
              headerLeft: () => (
                <Button
                  title="Home"
                  onPress={() => navigationRef.navigate('Home')}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
