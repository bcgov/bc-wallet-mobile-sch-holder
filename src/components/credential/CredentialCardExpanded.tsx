import styled, {css} from '@emotion/native';
import {useNavigation} from '@react-navigation/core';
import React, {useContext} from 'react';
import {Alert, Dimensions, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {theme} from '../../../App';
import {
  boldText,
  text,
  vaccinationStatusColor,
  vaccinationStatusText,
} from '../../assets/styles';
import {DispatchAction} from '../../Reducer';
import {Context} from '../../Store';
import {CredentialHelper} from '../../utils/credhelper';
import {formatAsIssuedDate} from '../../utils/date';
import {CrendentialContextMenu} from './CredentialContextMenu';

const {width} = Dimensions.get('window');

const StatusView = styled.View`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.headerBlue};
`;

const QRCodeView = styled.View`
  display: flex;
  margin-top: 8px;
  align-items: center;
  justify-content: center;
`;

const NormalText = styled.Text`
  ${text}
  font-size: 16px;
  color: ${theme.colors.white};
  text-align: center;
`;

const LargeText = styled.Text`
  ${text}
  font-size: 18px;
  color: ${theme.colors.white};
  text-align: center;
`;

const LargeBoldText = styled.Text`
  ${boldText}
  font-size: 18px;
  color: ${theme.colors.white};
  text-align: center;
`;

const smallerTopPadding = css`
  padding-top: 4px;
`;

const verticalPadding = css`
  padding-vertical: 8px;
`;

const topPadding = css`
  padding-top: 8px;
`;

const leftPadding = css`
  padding-left: 48px;
`;

const bottomRadius = css`
  border-bottom-start-radius: 16px;
  border-bottom-end-radius: 16px;
`;

const reverseRow = css`
  flex-direction: row-reverse;
`;

const columnGrow = css`
  flex-direction: column;
  flex-grow: 1;
`;

export const CredentialCardExpanded: React.FC<any> = ({credential}) => {
  const [, dispatch] = useContext(Context);
  const navigation = useNavigation();

  const deleteCard = () => {
    try {
      dispatch({
        type: DispatchAction.RemoveCredential,
        payload: [credential],
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Yikes!',
        'There was a problem removing this card.',
        [{text: 'OK'}],
        {cancelable: true},
      );
    }
  };

  const showCardDetails = () => {
    try {
      navigation.navigate('CredentialDetail' as never, {credential} as never);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Yikes!',
        'There was a problem viewing this card.',
        [{text: 'OK'}],
        {cancelable: true},
      );
    }
  };

  return (
    <View style={[{width}]}>
      <StatusView
        style={[
          topPadding,
          {
            backgroundColor: vaccinationStatusColor(
              CredentialHelper.immunizationStatus(credential.record),
            ),
          },
          bottomRadius,
        ]}>
        <View style={[reverseRow]}>
          <CrendentialContextMenu
            onDeleteTouched={deleteCard}
            onShowDetailsTouched={showCardDetails}
          />
          <View style={[columnGrow, leftPadding]}>
            <LargeText>
              {CredentialHelper.familyNameForCredential(
                CredentialHelper.nameForCredential(credential.record),
              )?.toUpperCase() || ' '}
              ,
            </LargeText>
            <LargeText>
              {CredentialHelper.givenNameForCredential(
                CredentialHelper.nameForCredential(credential.record),
              )?.toUpperCase() || ' '}
            </LargeText>
          </View>
        </View>

        <LargeBoldText style={[verticalPadding]}>
          {vaccinationStatusText(
            CredentialHelper.immunizationStatus(credential.record),
          )}
        </LargeBoldText>
        <NormalText>
          Issued{' '}
          {formatAsIssuedDate(CredentialHelper.issueAtDate(credential.record))}
        </NormalText>
        <QRCodeView style={smallerTopPadding}>
          <QRCode value={credential.raw} quietZone={4} size={width - 32} />
        </QRCodeView>
      </StatusView>
    </View>
  );
};
