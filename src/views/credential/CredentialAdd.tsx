import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
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

const container = css`
  padding: 32px;
`;

const flexRow = css`
  flex-direction: row;
  align-items: center;
`;

const button = css`
  padding: 32px;
  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const buttonText = css`
  ${boldText}
  font-size: 18px;
  margin-left: 18px;
  flex-shrink: 1;
`;

const iconMargin = css`
  margin-left: 9px;
`;

export const CredentialAdd = ({navigation}: Props) => {
  const credHelper = new CredentialHelper();

  async function uploadImage() {
    try {
      launchImageLibrary(
        {mediaType: 'photo', base64: true} as ImageLibraryOptions,
        async image => {
          if (image.didCancel) {
            return;
          }

          const {assets} = image;
          if (!assets?.length) {
            return;
          }

          const {uri} = assets[0];
          if (!uri) {
            return;
          }

          const res = await RNQRGenerator.detect({uri});
          if (res.values.length) {
            for (const cred of res.values) {
              await credHelper.storeCredential(cred);
            }
            navigation.navigate('Credentials');
          }
        },
      );
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
          <Text style={[buttonText]}>Scan a QR Code</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[button]}
        underlayColor={theme.colors.activeGray}
        onPress={() => uploadImage()}>
        <View style={[flexRow]}>
          <Image />
          <Text style={[buttonText]}>Upload a QR Code</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[button]}
        underlayColor={theme.colors.activeGray}
        onPress={_ => _}>
        <View style={[flexRow]}>
          <Browser />
          <Text style={[buttonText]}>Get from Health Gateway</Text>
          <FontAwesomeIcon
            style={[iconMargin]}
            size={16}
            icon="external-link-alt"
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};
