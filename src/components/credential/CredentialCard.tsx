import React from 'react';
import styled from '@emotion/native';
import {theme} from '../../../App';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {ImmunizationStatus} from '../../utils/credhelper';
import {vaccinationStatusColor} from '../../assets/styles';
import {formatAsIssuedDate} from '../../utils/date';

export interface ICredentialProps {
  name: string;
  immunizationStatus: ImmunizationStatus;
  issuedAt: Date;
}

const ContainerView = styled.View`
  flex: 0 0 100px;
  display: flex;
  height: 132px;
  width: 333px;
  flex-direction: row;
  background-color: ${theme.colors.headerBlue};
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const IconView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.headerBlue};
  padding: 16px 8px 16px 16px;
`;

const DetailsView = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${theme.colors.headerBlue};
  padding: 16px 16px 16px 8px;
`;

const HeaderText = styled.Text`
  font-family: 'BCSans-Bold';
  font-size: 26px;
  color: ${theme.colors.white};
  text-align: center;
`;

const LineView = styled.View`
  height: 1px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${theme.colors.betaYellow};
`;

const NormalText = styled.Text`
  font-family: 'BCSans-Regular';
  font-size: 18px;
  color: ${theme.colors.white};
`;

const CredentialCard: React.FC<ICredentialProps> = ({
  name,
  immunizationStatus: vaccinationStatus,
  issuedAt,
}) => {
  const qrCodeSize = 40;
  const vaccinationStatusText = (status: ImmunizationStatus): string => {
    if (status === ImmunizationStatus.Full) {
      return 'Fully Vaccinated';
    }
    return 'Partially Vaccinated';
  };

  return (
    <ContainerView
      style={{
        backgroundColor: vaccinationStatusColor(vaccinationStatus),
      }}>
      <IconView
        style={{
          backgroundColor: vaccinationStatusColor(vaccinationStatus),
        }}>
        <FontAwesomeIcon
          icon="qrcode"
          size={qrCodeSize}
          color={theme.colors.white}
        />
      </IconView>
      <DetailsView
        style={{
          backgroundColor: vaccinationStatusColor(vaccinationStatus),
        }}>
        <HeaderText>{name}</HeaderText>
        <LineView />
        <NormalText>{vaccinationStatusText(vaccinationStatus)}</NormalText>
        <NormalText>Issued {formatAsIssuedDate(issuedAt)}</NormalText>
      </DetailsView>
    </ContainerView>
  );
};

export default CredentialCard;
