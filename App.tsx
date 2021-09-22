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
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider} from '@emotion/react';
import {CredentialTabs} from './src/components/credential/CredentialTabs';
import {Home} from './src/views/Home';
import {CredentialAdd} from './src/views/credential/CredentialAdd';
import {Scanner} from './src/views/Scanner';

const theme = {
  primaryBlue: 'hotpink',
  secondaryBlue: 'purple',
  primaryYellow: 'yellow',
};

type RootStackParamList = {
  Home: undefined;
  CredentialTabs: undefined;
  CredentialAdd: undefined;
  Scanner: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList>;

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Group>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="CredentialTabs"
                component={CredentialTabs}
                options={{headerTitle: 'Your Wallet'}}
              />
              <Stack.Screen
                name="CredentialAdd"
                component={CredentialAdd}
                options={{headerTitle: 'Add Vaccine Card'}}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen
                name="Scanner"
                component={Scanner}
                options={{headerTitle: 'Scan QR Code'}}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;
