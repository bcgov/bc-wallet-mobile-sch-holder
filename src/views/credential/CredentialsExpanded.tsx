import React, {Ref, useContext, useRef} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {Context} from '../../Store';
import {CredentialCardExpanded} from '../../components/credential/CredentialCardExpanded';
import {css} from '@emotion/native';
import {Credential as C} from '../../types';

const {width} = Dimensions.get('window');

const flex = css`
  flex: 1;
`;

const centeredText = css`
  text-align: center;
`;

const marginLeft = css`
  margin-left: 16px;
`;

export const CredentialsExpanded: React.FC<any> = ({route}) => {
  const flatListRef: Ref<FlatList> = useRef(null);
  const [state] = useContext(Context);
  const {credentials} = state;
  const {credential} = route.params;

  const renderItem = ({item, index}: {item: C; index: number}) => (
    <View style={[index > 0 && marginLeft]}>
      <CredentialCardExpanded key={item.id} credential={item} />
    </View>
  );

  const data = [
    credential,
    ...credentials.filter((c: C) => c.id !== credential.id),
  ];

  return (
    <View style={[flex]}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[{width}]}
        data={data}
        renderItem={renderItem}
        snapToOffsets={[
          0,
          ...Array(credentials.length)
            .fill(0)
            .map((n: number, i: number) => i * (width + 16))
            .slice(1),
        ]}
        decelerationRate="fast"
      />
      <View>
        <Text style={[centeredText]}>TODO: Arrows go here</Text>
      </View>
    </View>
  );
};
