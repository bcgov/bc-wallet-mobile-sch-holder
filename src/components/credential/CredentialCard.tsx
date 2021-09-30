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

export interface ICredentialProps {
  name: PersonName | string;
  immunizationStatus: ImmunizationStatus;
  issuedAt: Date;
}

const qrCodeSize = 48;

const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
`;

const ColumnView = styled.View`
  flex-direction: column;
`;

const IconView = styled.View`
  padding: 16px 16px;
`;

const HeaderText = styled.Text`
  ${text}
  font-size: 18px;
  color: ${theme.colors.white};
`;

const NormalText = styled.Text`
  ${text}
  font-size: 16px;
  color: ${theme.colors.white};
`;

const NormalBoldText = styled.Text`
  ${boldText}
  font-size: 18px;
  color: ${theme.colors.white};
`;

const margin = css`
  margin: 8px 16px 8px 16px;
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
          justifyContent: 'space-between',
          backgroundColor: vaccinationStatusColor(vaccinationStatus),
        },
      ]}>
      <ColumnView>
        <RowView>
          <IconView>
            <QrCode
              width={qrCodeSize}
              height={qrCodeSize}
              fill={theme.colors.white}
            />
          </IconView>
          <ColumnView style={{paddingTop: 16}}>
            <HeaderText>
              {CredentialHelper.familyNameForCredential(name).toUpperCase()},
            </HeaderText>
            <HeaderText>
              {CredentialHelper.givenNameForCredential(name).toUpperCase()}
            </HeaderText>
          </ColumnView>
        </RowView>
        <ColumnView style={{paddingTop: 0, paddingBottom: 16, paddingLeft: 80}}>
          <NormalBoldText>
            {vaccinationStatusText(vaccinationStatus)}
          </NormalBoldText>
          <NormalText>Issued {formatAsIssuedDate(issuedAt)}</NormalText>
        </ColumnView>
      </ColumnView>
      <ColumnView style={{justifyContent: 'flex-end'}}>
        <IconView>
          <LargeArrow
            height={48}
            width={16}
            fill={theme.colors.white}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </IconView>
      </ColumnView>
    </RowView>
  );
};

export default CredentialCard;
