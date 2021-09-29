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
import {Dimensions, View} from 'react-native';
import {PersonName} from '../../types';

const {width} = Dimensions.get('window');

export interface ICredentialProps {
  name: PersonName | string;
  immunizationStatus: ImmunizationStatus;
  issuedAt: Date;
}

const qrCodeSize = 48;

const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ColumnView = styled.View`
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
`;

const IconView = styled.View`
  padding: 0px 16px;
`;

const LineView = styled.View`
  height: 1px;
  background-color: ${theme.colors.betaYellow};
`;

const HeaderText = styled.Text`
  ${text}
  font-size: 16px;
  color: ${theme.colors.white};
`;

const NormalText = styled.Text`
  ${text}
  font-size: 16px;
  color: ${theme.colors.white};
`;

const NormalBoldText = styled.Text`
  ${boldText}
  font-size: 16px;
  color: ${theme.colors.white};
`;

const margin = css`
  margin: 8px 16px 8px 16px;
`;

const textPaddingLeft = css`
  padding-left: 80px;
`;

const textPaddingRight = css`
  padding-right: 48px;
`;

const paddingTop = css`
  padding-top: 16px;
  margin-bottom: -8px;
`;

const paddingBottom = css`
  padding-bottom: 16px;
  margin-top: -8px;
`;

const CredentialCard: React.FC<ICredentialProps> = ({
  name,
  immunizationStatus: vaccinationStatus,
  issuedAt,
}) => {
  return (
    <ColumnView
      style={[
        margin,
        {
          backgroundColor: vaccinationStatusColor(vaccinationStatus),
        },
      ]}>
      <View style={[textPaddingLeft, textPaddingRight, paddingTop]}>
        <HeaderText>
          {CredentialHelper.familyNameForCredential(name).toUpperCase()},
        </HeaderText>
        <HeaderText>
          {CredentialHelper.givenNameForCredential(name).toUpperCase()}
        </HeaderText>
      </View>
      <RowView>
        <IconView>
          <QrCode
            width={qrCodeSize}
            height={qrCodeSize}
            fill={theme.colors.white}
          />
        </IconView>
        <LineView style={{width: width - qrCodeSize - 7 * 16}} />
        <IconView>
          <LargeArrow
            height={48}
            width={16}
            fill={theme.colors.white}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </IconView>
      </RowView>
      <View style={[textPaddingLeft, paddingBottom]}>
        <NormalBoldText>
          {vaccinationStatusText(vaccinationStatus)}
        </NormalBoldText>
        <NormalText>Issued {formatAsIssuedDate(issuedAt)}</NormalText>
      </View>
    </ColumnView>
  );
};

export default CredentialCard;
