import React from 'react';
import {Button, View} from 'react-native';

export const CredentialAdd = ({navigation}) => {
  return (
    <View>
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate('Scanner')}
      />
      <Button title="Upload QR Code" />
      <Button title="Get From BC Health" />
    </View>
  );
};
