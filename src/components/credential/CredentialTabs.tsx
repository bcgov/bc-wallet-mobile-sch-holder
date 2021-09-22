import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Credentials } from '../../views/credential/Credentials';
import { Settings } from '../../views/Settings';

const Tab = createBottomTabNavigator();

export const CredentialTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Credentials">
      <Tab.Screen
        name="Credentials"
        component={Credentials}
        options={{ headerShown: false, tabBarLabel: 'Your Wallet' }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
