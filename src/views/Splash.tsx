import React from 'react';
import {css} from '@emotion/native';
import {ActivityIndicator} from 'react-native';
import {theme} from '../../App';
import DarkSafeAreaView from '../components/layout/DarkSafeAreaView';
import Logo from '../assets/img/logo-light.svg';

const container = css`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Splash = () => {
  return (
    <DarkSafeAreaView style={[container]}>
      <Logo width={250} height={250} />
      <ActivityIndicator color={theme.colors.white} />
    </DarkSafeAreaView>
  );
};
