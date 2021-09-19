import React from 'react';
import { Button, View } from 'react-native';

export const Home = ({ navigation }) => (
  <View>
    <Button
      title="Scan QR Code"
      onPress={() => navigation.navigate('Scanner')}
    />
    <Button
      title="Credentials"
      onPress={() => navigation.navigate('Credentials')}
    />
  </View>
);
