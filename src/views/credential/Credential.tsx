import React, {useContext, useEffect, useState} from 'react';
import {
  paginationStyleItemActive,
  paginationStyleItemInactive,
} from '../../assets/styles';
import {ScrollView, View} from 'react-native';
import {Context} from '../../Store';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {CredentialCardExpanded} from '../../components/credential/CredentialCardExpanded';
import {css} from '@emotion/native';

const paginationStyle = css`
  top: 0;
`;

const swiperListPadding = css`
  padding-vertical: 32px;
  padding-horizontal: 16px;
`;

export const Credential: React.FC<any> = ({route}) => {
  const {credential} = route.params || 0;
  const [state] = useContext(Context);
  const {credentials} = state;
  const index = credentials.findIndex(c => c.id === credential.id);

  return (
    <ScrollView>
      <SwiperFlatList
        data={credentials}
        renderItem={({item}) => (
          <View style={swiperListPadding}>
            <CredentialCardExpanded credential={item} />
          </View>
        )}
        renderAll={true}
        index={index}
        paginationStyle={paginationStyle}
        paginationStyleItemInactive={paginationStyleItemInactive}
        paginationStyleItemActive={paginationStyleItemActive}
        showPagination={credentials?.length > 1}
      />
    </ScrollView>
  );
};
