import {css} from '@emotion/native';
import {AppTheme, theme} from '../../../App';
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

export const primaryButton = (theme: AppTheme) => css`
  padding: 16px 32px;
  border-radius: 4px;
  background-color: ${theme.colors.primaryBlue};
`;

export const primaryButtonText = (theme: AppTheme) => css`
  font-size: 18px;
  color: ${theme.colors.white};
`;
