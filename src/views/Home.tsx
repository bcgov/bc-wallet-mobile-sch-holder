import React from 'react';
import {Button, View} from 'react-native';

export const Home = ({navigation}) => (
  <View>
    <Button title="First Time Using App" onPress={_ => _} />
    <Button
      title="Already Set Up"
      onPress={() => navigation.navigate('CredentialTabs')}
    />
  </View>
);
