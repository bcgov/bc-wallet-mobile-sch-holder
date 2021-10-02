import React from 'react';
import styled, {css} from '@emotion/native';
import {theme} from '../../../App';
import {CredentialHelper, ImmunizationStatus} from '../../utils/credhelper';
import {
  boldText,
  text,
  vaccinationStatusColor,
  vaccinationStatusText,
} from '../../assets/styles';
import QrCode from '../../assets/img/qrcode.svg';
import LargeArrow from '../../assets/img/large-arrow.svg';
import {formatAsIssuedDate} from '../../utils/date';
import {PersonName} from '../../types';
import {View} from 'react-native';

export interface ICredentialProps {
  name: PersonName | string;
  immunizationStatus: ImmunizationStatus;
  issuedAt: Date;
}

const qrCodeSize = 48;

const RowView = styled.View`
  flex-direction: row;
  border-radius: 16px;
`;

const ColumnView = styled.View`
  flex-direction: column;
`;

const NormalText = styled.Text`
  ${text}
  font-size: 16px;
  color: ${theme.colors.white};
`;

const LargeText = styled.Text`
  ${text}
  font-size: 18px;
  color: ${theme.colors.white};
`;

const LargeBoldText = styled.Text`
  ${boldText}
  font-size: 18px;
  color: ${theme.colors.white};
`;

const margin = css`
  margin: 8px 16px 8px 16px;
`;

const qrCodePadding = css`
  padding-vertical: 16px;
  padding-left: 16px;
  padding-right: 8px;
  align-self: center;
`;

const arrowPadding = css`
  padding-left: 8px;
  padding-right: 16px;
  align-self: center;
`;

const textPadding = css`
  padding-vertical: 16px;
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;
`;

const namePadding = css`
  padding-bottom: 4px;
`;

const statusPadding = css`
  padding-top: 4px;
`;

const CredentialCard: React.FC<ICredentialProps> = ({
  name,
  immunizationStatus: vaccinationStatus,
  issuedAt,
}) => {
  return (
    <RowView
      style={[
        margin,
        {
          backgroundColor: vaccinationStatusColor(vaccinationStatus),
        },
      ]}>
      <ColumnView style={[qrCodePadding]}>
        <QrCode
          width={qrCodeSize}
          height={qrCodeSize}
          fill={theme.colors.white}
        />
      </ColumnView>
      <ColumnView style={[textPadding]}>
        <View style={[namePadding]}>
          <LargeText>
            {CredentialHelper.familyNameForCredential(name).toUpperCase()},
          </LargeText>
          <LargeText>
            {CredentialHelper.givenNameForCredential(name).toUpperCase()}
          </LargeText>
        </View>
        <View style={[statusPadding]}>
          <LargeBoldText>
            {vaccinationStatusText(vaccinationStatus)}
          </LargeBoldText>
          <NormalText>Issued {formatAsIssuedDate(issuedAt)}</NormalText>
        </View>
      </ColumnView>
      <ColumnView style={[arrowPadding]}>
        <LargeArrow
          height={48}
          width={16}
          fill={theme.colors.white}
          style={{transform: [{rotate: '180deg'}]}}
        />
      </ColumnView>
    </RowView>
  );
};

export default CredentialCard;
