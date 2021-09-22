import React from 'react';
import {Button, PermissionsAndroid, Platform, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import {Props} from '../../../App';
import {CredentialHelper} from '../../utils/credhelper';

export const CredentialAdd = ({navigation}: Props) => {
  const credHelper = new CredentialHelper();

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function uploadImage() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    try {
      launchImageLibrary({mediaType: 'photo', base64: true}, async image => {
        const res = await RNQRGenerator.detect({uri: image?.assets[0]?.uri});
        if (res.values.length) {
          for (const cred of res.values) {
            await credHelper.storeCredential(cred);
          }

          navigation.navigate('CredentialTabs');
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate('Scanner')}
      />
      <Button title="Upload QR Code" onPress={() => uploadImage()} />
      <Button title="Get From BC Health" onPress={_ => _} />
    </View>
  );
};
