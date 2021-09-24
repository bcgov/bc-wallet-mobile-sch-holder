import {css} from '@emotion/native';
import {theme} from '../../../App';
import {ImmunizationStatus} from '../../utils/credhelper';

export const boldText = css`
  font-weight: bold;
`;

export const vaccinationStatusText = (status: ImmunizationStatus): string => {
  if (status === ImmunizationStatus.Full) {
    return 'Fully Vaccinated';
  }
  return 'Partially Vaccinated';
};

export const vaccinationStatusColor = (status: ImmunizationStatus): string => {
  if (status === ImmunizationStatus.Full) {
    return theme.colors.successGreen;
  }
  return theme.colors.headerBlue;
};
