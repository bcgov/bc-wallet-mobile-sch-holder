import React, {Ref, useContext, useRef} from 'react';
import {Animated, Dimensions, FlatList, View} from 'react-native';
import {Context} from '../../Store';
import {CredentialCardExpanded} from '../../components/credential/CredentialCardExpanded';
import {css} from '@emotion/native';
import {Credential} from '../../types';
import {Pagination} from '../../components/shared/Pagination';

const {width} = Dimensions.get('window');

const flex = css`
  flex: 1;
`;

const container = css`
  align-items: center;
`;

const containerFlex = css`
  ${flex}
  ${container}
`;

const marginLeft = css`
  margin-left: 16px;
`;

export const CredentialsExpanded: React.FC<any> = ({route}) => {
  const [state] = useContext(Context);
  const {credentials} = state;
  const {credential} = route.params;

  const flatList: Ref<FlatList> = useRef(null);
  const [activeData, setActiveData] = React.useState({index: 0, credential});
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const onViewableItemsChangedRef = React.useRef(({viewableItems}: any) => {
    setActiveData(viewableItems[0]);
  });
  const viewabilityConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {
      useNativeDriver: false,
    },
  );

  const next = () => {
    const {index} = activeData;
    if (index + 1 < data.length) {
      flatList?.current?.scrollToIndex({
        viewOffset: -16,
        index: index + 1,
        animated: true,
      });
    }
  };
  const previous = () => {
    const {index} = activeData;
    if (index !== 0) {
      flatList?.current?.scrollToIndex({
        viewOffset: index - 1 && -16,
        index: index - 1,
        animated: true,
      });
    }
  };

  const renderItem = React.useCallback(
    ({item, index}: {item: Credential; index: number}) => (
      <View style={[index > 0 && marginLeft]}>
        <CredentialCardExpanded key={item.id} credential={item} />
      </View>
    ),
    [],
  );

  const data = [
    credential,
    ...credentials.filter((c: Credential) => c.id !== credential.id),
  ];

  return (
    <View style={[containerFlex]}>
      <FlatList
        ref={flatList}
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
        viewabilityConfig={viewabilityConfigRef.current}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      <Pagination
        data={data}
        scrollX={scrollX}
        next={next}
        previous={previous}
      />
    </View>
  );
};
