import styled, {css} from '@emotion/native';
import React from 'react';
import {Dimensions, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {theme} from '../../../App';
import {
  boldText,
  text,
  vaccinationStatusColor,
  vaccinationStatusText,
} from '../../assets/styles';
import {CredentialHelper} from '../../utils/credhelper';
import {formatAsIssuedDate} from '../../utils/date';

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

const bottomRadius = css`
  border-bottom-start-radius: 16px;
  border-bottom-end-radius: 16px;
`;

export const CredentialCardExpanded: React.FC<any> = ({credential}) => {
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
        ]}
      >
        <View>
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
