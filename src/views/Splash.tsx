import {css} from '@emotion/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {theme} from '../../App';

import Logo from '../assets/img/logo-light.svg';

const container = css`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.primaryBlue};
`;

export const Splash = ({navigation}) => {
  useEffect(() => {
    // FIXME: This is mimicking a long front-loading async action for demo purposes
    setTimeout(() => navigation.navigate('Home'), 2000);
  }, [navigation]);

  return (
    <View style={[container]}>
      <Logo width={250} height={250} />
      <ActivityIndicator color={theme.colors.white} />
    </View>
  );
};
