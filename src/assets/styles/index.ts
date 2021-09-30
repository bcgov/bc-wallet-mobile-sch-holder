import {css} from '@emotion/native';
import {AppTheme, theme} from '../../../App';
import {ImmunizationStatus} from '../../utils/credhelper';

export const vaccinationStatusText = (status: ImmunizationStatus): string => {
  if (status === ImmunizationStatus.Full) {
    return 'Vaccinated';
  }
  return 'Partially Vaccinated';
};

export const vaccinationStatusColor = (status: ImmunizationStatus): string => {
  if (status === ImmunizationStatus.Full) {
    return theme.colors.successGreen;
  }
  return theme.colors.headerBlue;
};

// eslint-disable-next-line no-shadow
export const primaryButton = (theme: AppTheme) => css`
  padding: 16px 32px;
  border-radius: 4px;
  background-color: ${theme.colors.primaryBlue};
`;

// eslint-disable-next-line no-shadow
export const primaryButtonText = (theme: AppTheme) => css`
  font-family: 'BCSans-Regular';
  font-size: 18px;
  color: ${theme.colors.white};
`;

export const text = css`
  font-family: 'BCSans-Regular';
`;

export const boldText = css`
  font-family: 'BCSans-Bold';
`;
