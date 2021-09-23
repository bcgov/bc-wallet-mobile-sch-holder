import styled from '@emotion/native';
import React from 'react';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 16px;
`;

export const Settings = () => {
  return (
    <View>
      <Text>Settings screen</Text>
    </View>
  );
};
