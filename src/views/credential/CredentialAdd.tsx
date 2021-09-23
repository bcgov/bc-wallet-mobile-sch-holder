import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import {CredentialHelper} from '../../utils/credhelper';
import {AppTheme, Props} from '../../../App';

import QrCodeScan from '../../assets/img/qrcode-scan.svg';
import Image from '../../assets/img/image.svg';
import Browser from '../../assets/img/browser.svg';
import {boldText} from '../../assets/styles';

import {css} from '@emotion/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useTheme} from '@emotion/react';

const flexRow = css`
  flex-direction: row;
  align-items: center;
`;

const container = css`
  padding: 32px;
`;

const button = css`
  padding: 32px;
  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const buttonText = css`
  font-size: 18px;
  margin-left: 18px;
  flex-shrink: 1;
`;

const iconMargin = css`
  margin-left: 9px;
`;

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

  const theme = useTheme() as AppTheme;

  return (
    <View style={[container]}>
      <TouchableHighlight
        style={[button]}
        underlayColor={theme.colors.activeGray}
        onPress={() => navigation.navigate('Scanner')}>
        <View style={[flexRow]}>
          <QrCodeScan />
          <Text style={[buttonText, boldText]}>Scan a QR Code</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[button]}
        underlayColor={theme.colors.activeGray}
        onPress={() => uploadImage()}>
        <View style={[flexRow]}>
          <Image />
          <Text style={[buttonText, boldText]}>Upload a QR Code</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[button]}
        underlayColor={theme.colors.activeGray}
        onPress={_ => _}>
        <View style={[flexRow]}>
          <Browser />
          <Text style={[buttonText, boldText]}>
            Get from Health Gateway
            <FontAwesomeIcon
              style={[iconMargin]}
              size={14}
              icon="external-link-alt"
            />
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};
