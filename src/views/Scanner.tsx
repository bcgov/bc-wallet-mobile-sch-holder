import React, {useState} from 'react';
import {TouchableHighlight, Vibration, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Props, theme} from '../../App';
import FlashOn from '../assets/img/flash-on.svg';
import FlashOff from '../assets/img/flash-off.svg';
import {CredentialHelper} from '../utils/credhelper';
import {css} from '@emotion/native';

export const Scanner = ({navigation}: Props) => {
  const [active, setActive] = useState(true);
  const [torch, setTorch] = useState(false);
  const credHelper = new CredentialHelper();

  const container = css`
    flex: 1;
    // flex-direction: 'column',
  `;

  const preview = css`
    flex: 1;
    justify-content: center;
    align-items: center;
  `;

  const window = css`
    width: 240px;
    height: 240px;
    margin: 96px;
    margin-bottom: ${96 - 48}px;
    border-radius: 16px;
    border: 2px solid ${theme.colors.white};
  `;

  const torchButton = css`
    border-radius: 24px;
    background-color: ${torch ? theme.colors.white : theme.colors.black};
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
    align-self: center;
  `;

  return (
    <View style={[container]}>
      {active && (
        <RNCamera
          style={[preview]}
          type={RNCamera.Constants.Type.back}
          flashMode={
            torch
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
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
          <View>
            <View style={[window]} />
            <TouchableHighlight
              style={[torchButton]}
              onPress={() => setTorch(!torch)}>
              {torch ? (
                <FlashOff fill="black" width={24} height={24} />
              ) : (
                <FlashOn fill="white" width={24} height={24} />
              )}
            </TouchableHighlight>
          </View>
        </RNCamera>
      )}
    </View>
  );
};
