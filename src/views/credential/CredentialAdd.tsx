import React from 'react';
import {Button, View} from 'react-native';
import {Props} from '../../../App';

export const CredentialAdd = ({navigation}: Props) => {
  return (
    <View>
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate('Scanner')}
      />
      <Button title="Upload QR Code" onPress={_ => _} />
      <Button title="Get From BC Health" onPress={_ => _} />
    </View>
  );
};
