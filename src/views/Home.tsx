import React from 'react';
import {Button, View} from 'react-native';
import {Props} from '../../App';

export const Home = ({navigation}: Props) => (
  <View>
    <Button title="First Time Using App" onPress={_ => _} />
    <Button
      title="Already Set Up"
      onPress={() => navigation.navigate('CredentialTabs')}
    />
  </View>
);
