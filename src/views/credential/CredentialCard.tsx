import React from 'react';
import styled from '@emotion/native';
import {theme} from '../../../App';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faQrcode} from '@fortawesome/free-solid-svg-icons';
import {VaccinationStatus} from '../../utils/credhelper';

export interface ICredentialProps {
  name: string;
  vaccinationStatus: VaccinationStatus;
  issued: string;
}

const ContainerView = styled.View`
  flex: 0 0 100px;
  display: flex;
  height: 132px;
  width: 333px;
  flex-direction: row;
  background-color: ${theme.colors.headerBlue};
  border-radius: 10px;
`;

const IconView = styled.View`
  display: flex;
  width: 60px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.headerBlue};
  border-radius: 10px;
`;

const DetailsView = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${theme.colors.headerBlue};
  padding-left: 15px;
  border-radius: 10px;
`;

const HeaderText = styled.Text`
  font-family: 'BCSans-Bold';
  font-size: 26px;
  color: ${theme.colors.white};
  text-align: center;
`;

const LineView = styled.View`
  height: 1px;
  width: 90%;
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
  vaccinationStatus,
  issued,
}) => {
  const qrCodeSize = 40;
  const vaccinationStatusText = (status: VaccinationStatus): string => {
    if (status === VaccinationStatus.Full) {
      return 'Fully Vaccinated';
    }
    return 'Partially Vaccinated';
  };

  return (
    <ContainerView>
      <IconView>
        <FontAwesomeIcon
          icon={faQrcode}
          size={qrCodeSize}
          color={theme.colors.white}
        />
      </IconView>
      <DetailsView>
        <HeaderText>{name}</HeaderText>
        <LineView />
        <NormalText>{vaccinationStatusText(vaccinationStatus)}</NormalText>
        <NormalText>Issued {issued}</NormalText>
      </DetailsView>
    </ContainerView>
  );
};

export default CredentialCard;
