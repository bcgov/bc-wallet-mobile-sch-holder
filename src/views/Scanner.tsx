import React, { useEffect, useState } from 'react';
import { StyleSheet, Vibration, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import EncryptedStorage from 'react-native-encrypted-storage';

export const Scanner = ({ navigation }) => {
  const [active, setActive] = useState(true);

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
            Vibration.vibrate();
            await storeQrCodeUrl(e.data);
            setActive(false);
            navigation.navigate('Credentials');
          }}>
          <View style={styles.window} />
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
});

const storeQrCodeUrl = async (url: string) => {
  try {
    await EncryptedStorage.setItem(
      'shc_vaccination',
      JSON.stringify({
        url,
      }),
    );
  } catch (error) {
    console.error(error);
  }
};
