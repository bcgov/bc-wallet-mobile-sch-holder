import React, {useState} from 'react';
import {StyleSheet, Vibration, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Props} from '../../App';
import {CredentialHelper} from '../utils/credhelper';

export const Scanner = ({navigation}: Props) => {
  const [active, setActive] = useState(true);
  const credHelper = new CredentialHelper();

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
            navigation.navigate('CredentialTabs');
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
  upload: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 16,
    alignSelf: 'center',
    margin: 32,
  },
});
