/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  NavigationContainer,
  Theme as NavigationTheme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './src/views/Home';
import {CredentialAdd} from './src/views/credential/CredentialAdd';
import {Credential} from './src/views/credential/Credential';
import {Credentials} from './src/views/credential/Credentials';
import {Scanner} from './src/views/Scanner';
import {Splash} from './src/views/Splash';
import {Theme, ThemeProvider} from '@emotion/react';
import styled from '@emotion/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import './src/assets/icons';
import Store from './src/Store';

export interface AppTheme extends Theme {
  colors: Record<string, string>;
}

export const theme: AppTheme = {
  colors: {
    primaryBlue: '#003366',
    activeBlue: '#003366B3',
    activeGray: '#E6E6E6',
    linkBlue: '#1A5A96',
    headerBlue: '#38598A',
    betaYellow: '#FCBA19',
    textGray: '#313132',
    backgroundGray: '#F2F2F2',
    inputGray: '#606060',
    errorRed: '#D8292F',
    successGreen: '#2E8540',
    black: '#000000',
    white: '#FFFFFF',
    tabActive: '#38598A',
    tabInactive: '#707070',
    transparent: '#FFFFFF00',
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
  Credentials: undefined;
  Credential: undefined;
  CredentialAdd: undefined;
  Scanner: undefined;
  Splash: undefined;
};

const RightHeaderIcon = styled.View`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: flex-end;
`;

const App = () => {
  const navigation = useNavigationContainerRef<RootStackParamList>();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Store>
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor={theme.colors.primaryBlue}
          barStyle="light-content"
        />
        <NavigationContainer theme={navigationTheme} ref={navigation}>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Group>
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerBackVisible: false,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="Credentials"
                component={Credentials}
                options={() => ({
                  headerTitle: 'Cards',
                  headerBackVisible: false,
                  gestureEnabled: false,
                  headerRight: () => {
                    return (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('CredentialAdd')}>
                        <RightHeaderIcon>
                          <FontAwesomeIcon
                            icon="plus"
                            color={theme.colors.white}
                          />
                        </RightHeaderIcon>
                      </TouchableOpacity>
                    );
                  },
                })}
              />
              <Stack.Screen
                name="CredentialAdd"
                component={CredentialAdd}
                options={{
                  headerTitle: 'Add Vaccine Card',
                }}
              />
              <Stack.Screen
                name="Credential"
                component={Credential}
                options={{headerTitle: ''}}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen
                name="Scanner"
                component={Scanner}
                options={{headerTitle: 'Scan a QR Code', headerShown: false}}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Store>
  );
};

export default App;
