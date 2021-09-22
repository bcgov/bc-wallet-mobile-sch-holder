import React, { useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import { CredentialHelper } from '../utils/credhelper';

export const Scanner = ({ navigation }) => {
  const [active, setActive] = useState(true);
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
      setActive(false);
      launchImageLibrary({ mediaType: 'photo', base64: true }, async image => {
        const res = await RNQRGenerator.detect({ uri: image?.assets[0]?.uri });
        if (res.values.length) {
          for (const cred of res.values) {
            await credHelper.storeCredential(cred);
          }

          navigation.navigate('Credentials');
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      {active && (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.torch}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={async e => {
            setActive(false);
            Vibration.vibrate();
            await credHelper.storeCredential(e.data);
            navigation.navigate('Credentials');
          }}>
          <View style={styles.window} />
          <View
            style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.upload}
              onPress={() => {
                uploadImage();
              }}>
              <Text style={{ fontSize: 18 }}>Upload</Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  window: {
    height: 250,
    width: 250,
    padding: 100,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  upload: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 16,
    alignSelf: 'center',
    margin: 32,
  },
});
