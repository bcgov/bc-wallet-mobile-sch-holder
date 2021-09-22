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
  Theme as NavigationTheme,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Theme, ThemeProvider} from '@emotion/react';
import {CredentialTabs} from './src/components/credential/CredentialTabs';
import {Home} from './src/views/Home';
import {CredentialAdd} from './src/views/credential/CredentialAdd';
import {Scanner} from './src/views/Scanner';
import styled from '@emotion/native';
import {StatusBar} from 'react-native';

import './src/assets/icons';

export interface AppTheme extends Theme {
  colors: Record<string, string>;
}

export const theme: AppTheme = {
  colors: {
    primaryBlue: '#003366',
    activeBlue: '#003366B3',
    linkBlue: '#1A5A96',
    headerBlue: '#38598A',
    betaYellow: '#FCBA19',
    textGray: '#313132',
    backgroundGray: '#F2F2F2',
    inputGray: '#606060',
    errorRed: '#D8292F',
    successGreen: '#2E8540',
    white: '#FFFFFF',
    tabActive: '#38598A',
    tabInactive: '#707070',
  },
};

const navigationTheme: NavigationTheme = {
  dark: false,
  colors: {
    primary: theme.colors.white,
    background: theme.colors.backgroundGray,
    card: theme.colors.primaryBlue,
    text: theme.colors.white,
    border: theme.colors.white,
    notification: theme.colors.white,
  },
};

type RootStackParamList = {
  Home: undefined;
  CredentialTabs: undefined;
  CredentialAdd: undefined;
  Scanner: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList>;

const FlexSafeAreaView = styled.SafeAreaView`
  background-color: ${theme.colors.primaryBlue};
  flex-grow: 1;
`;

const NoFlexSafeAreaView = styled.SafeAreaView`
  background-color: ${theme.colors.white};
  flex-grow: 0;
`;

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider theme={theme}>
      <FlexSafeAreaView>
        <StatusBar
          backgroundColor={theme.colors.primaryBlue}
          barStyle="light-content"
        />
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Group>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="CredentialTabs"
                component={CredentialTabs}
                options={{headerTitle: 'Cards'}}
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
                options={{headerShown: false}}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </FlexSafeAreaView>
      {/* Keep this here so the bottom status bar remains un-styled */}
      <NoFlexSafeAreaView />
    </ThemeProvider>
  );
};

export default App;
