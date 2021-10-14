import React, {useContext} from 'react';
import {Alert, Linking, Text, TouchableHighlight, View} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import {CredentialHelper} from '../../utils/credhelper';
import {theme} from '../../../App';

import QrCodeScan from '../../assets/img/qrcode-scan.svg';
import Image from '../../assets/img/image.svg';
import Browser from '../../assets/img/browser.svg';
import {boldText} from '../../assets/styles';

import {css} from '@emotion/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {DispatchAction} from '../../Reducer';
import {Context} from '../../Store';
import {useDeepLinking} from '../../hooks/useDeepLink';
import {healthGatewayURL} from '../../constants';

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
  border-radius: 4px;
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

export const CredentialAdd: React.FC<any> = ({navigation}) => {
  const [, dispatch] = useContext(Context);
  const navigateBackAfterAdd = true;

  const handleDeepLinkError = () => {
    Alert.alert(
      'Yikes!',
      'There was a problem saving this record.',
      [{text: 'OK'}],
      {cancelable: false},
    );
  };

  useDeepLinking(navigateBackAfterAdd, handleDeepLinkError);

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

          try {
            const res = await RNQRGenerator.detect({uri});
            if (res.values.length) {
              for (const cred of res.values) {
                const record = await CredentialHelper.decodeRecord(cred);
                if (!record) {
                  throw new Error('Invalid QR code');
                }
                dispatch({
                  type: DispatchAction.AddCredential,
                  payload: [{id: Date.now(), record, raw: cred}],
                });
              }
              navigation.navigate('Credentials');
            } else {
              Alert.alert(
                'Yikes!',
                "We couldn't find a QR code.",
                [{text: 'Ok'}],
                {cancelable: true},
              );
              navigation.navigate('CredentialAdd');
            }
          } catch (error) {
            console.error(error);
            Alert.alert(
              'Yikes!',
              'There was a problem decoding this QR code.',
              [{text: 'Ok'}],
              {cancelable: true},
            );
            navigation.navigate('CredentialAdd');
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={[container]}>
      <TouchableHighlight
        style={[button]}
        underlayColor={theme.colors.activeGray}
        onPress={() => navigation.navigate('Scanner')}
      >
        <View style={[flexRow]}>
          <QrCodeScan />
          <Text style={[buttonText]}>Scan a QR Code</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[button]}
        underlayColor={theme.colors.activeGray}
        onPress={() => uploadImage()}
      >
        <View style={[flexRow]}>
          <Image />
          <Text style={[buttonText]}>Upload a QR Code</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[button]}
        underlayColor={theme.colors.activeGray}
        onPress={() => {
          Linking.openURL(healthGatewayURL).catch(_ => {
            Alert.alert(
              'Yikes!',
              'There was a problem opening the Health Gateway.',
              [{text: 'OK'}],
              {cancelable: true},
            );
          });
        }}
      >
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
