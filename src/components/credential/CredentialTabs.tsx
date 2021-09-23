import {useTheme} from '@emotion/react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {AppTheme} from '../../../App';
import {Credentials} from '../../views/credential/Credentials';
import {Settings} from '../../views/Settings';

const Tab = createBottomTabNavigator();

export const CredentialTabs = () => {
  const theme = useTheme() as AppTheme;
  return (
    <Tab.Navigator
      initialRouteName="Credentials"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.white,
        },
        tabBarActiveTintColor: theme.colors.tabActive,
        tabBarInactiveTintColor: theme.colors.tabInactive,
      }}>
      <Tab.Screen
        name="Credentials"
        component={Credentials}
        options={{
          headerShown: false,
          tabBarLabel: 'Cards',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon="address-card" size={size} color={color} />
          ),
          tabBarLabelStyle: {fontSize: 16},
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon="cog" size={size} color={color} />
          ),
          tabBarLabelStyle: {fontSize: 16},
        }}
      />
    </Tab.Navigator>
  );
};
