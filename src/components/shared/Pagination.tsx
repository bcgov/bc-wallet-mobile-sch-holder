import {css} from '@emotion/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScalingDot} from 'react-native-animated-pagination-dots';
import {theme} from '../../../App';

import LargeArrow from '../../assets/img/large-arrow.svg';

const flex = css`
  flex: 1;
`;

const paginationStyle = css`
  flex-direction: row;
  align-items: center;
  padding-bottom: 16px;
`;

const relativePosition = css`
  position: relative;
  top: 0;
`;

export const Pagination: React.FC<any> = ({data, scrollX, next, previous}) => {
  return (
    <View style={[flex, paginationStyle]}>
      <TouchableOpacity onPress={previous}>
        <LargeArrow height={24} width={48} fill={theme.colors.primaryBlue} />
      </TouchableOpacity>
      <ScalingDot
        data={data}
        scrollX={scrollX}
        inActiveDotColor={theme.colors.primaryBlue}
        activeDotColor={theme.colors.primaryBlue}
        activeDotScale={1}
        containerStyle={relativePosition}
      />
      <TouchableOpacity onPress={next}>
        <LargeArrow
          height={24}
          width={48}
          fill={theme.colors.primaryBlue}
          style={{transform: [{rotate: '180deg'}]}}
        />
      </TouchableOpacity>
    </View>
  );
};
