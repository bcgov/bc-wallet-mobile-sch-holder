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
import {
  NavigationContainer,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Theme, ThemeProvider} from '@emotion/react';
import {Home} from './src/views/Home';
import {CredentialAdd} from './src/views/credential/CredentialAdd';
import {Credential} from './src/views/credential/Credential';
import {Scanner} from './src/views/Scanner';
import {Splash} from './src/views/Splash';
import styled from '@emotion/native';
import {StatusBar, TouchableWithoutFeedback} from 'react-native';

import './src/assets/icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Credentials} from './src/views/credential/Credentials';
import SplashScreen from 'react-native-splash-screen';

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
};

export type Props = NativeStackScreenProps<RootStackParamList>;

const FlexSafeAreaView = styled.SafeAreaView`
  background-color: ${theme.colors.primaryBlue};
  flex-grow: 1;
`;

const NoFlexSafeAreaView = styled.SafeAreaView`
  background-color: ${theme.colors.backgroundGray};
  flex-grow: 0;
`;

const RightHeaderIcon = styled.View`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: flex-end;
`;

const App = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <ThemeProvider theme={theme}>
      <FlexSafeAreaView>
        <StatusBar
          backgroundColor={theme.colors.primaryBlue}
          barStyle="light-content"
        />
        <NavigationContainer theme={navigationTheme}>
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
                options={{headerBackVisible: false, gestureEnabled: false}}
              />
              <Stack.Screen
                name="Credentials"
                component={Credentials}
                options={({navigation}) => ({
                  headerTitle: 'Cards',
                  headerBackVisible: false,
                  gestureEnabled: false,
                  headerRight: () => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('CredentialAdd')}>
                        <RightHeaderIcon>
                          <FontAwesomeIcon
                            icon="plus"
                            color={theme.colors.white}
                          />
                        </RightHeaderIcon>
                      </TouchableWithoutFeedback>
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
      </FlexSafeAreaView>
      {/* Keep this here so the bottom status bar remains un-styled */}
      <NoFlexSafeAreaView />
    </ThemeProvider>
  );
};

export default App;
