import React, {Ref, useContext, useLayoutEffect, useRef, useState} from 'react';
import {Alert, Animated, Dimensions, FlatList, View} from 'react-native';
import {Context} from '../../Store';
import {CredentialCardExpanded} from '../../components/credential/CredentialCardExpanded';
import {css} from '@emotion/native';
import {Credential} from '../../types';
import {Pagination} from '../../components/shared/Pagination';
import {CrendentialContextMenu} from '../../components/credential/CredentialContextMenu';
import {DispatchAction} from '../../Reducer';

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

export const CredentialsExpanded: React.FC<any> = ({route, navigation}) => {
  const [state, dispatch] = useContext(Context);
  const {credentials} = state;
  const {credential} = route.params;

  const flatList: Ref<FlatList> = useRef(null);
  const [activeData, setActiveData] = useState({index: 0, item: credential});
  const scrollX = useRef(new Animated.Value(0)).current;
  const onViewableItemsChangedRef = useRef(({viewableItems}: any) => {
    setActiveData(viewableItems[0]);
  });
  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  useLayoutEffect(() => {
    const deleteCard = () => {
      try {
        dispatch({
          type: DispatchAction.RemoveCredential,
          payload: [activeData.item],
        });
        navigation.goBack();
      } catch (error) {
        console.error(error);
        Alert.alert(
          'Yikes!',
          'There was a problem removing this card.',
          [{text: 'OK'}],
          {cancelable: true},
        );
      }
    };

    const showCardDetails = () => {
      try {
        navigation.navigate(
          'CredentialDetail' as never,
          {credential: activeData.item} as never,
        );
      } catch (error) {
        console.error(error);
        Alert.alert(
          'Yikes!',
          'There was a problem viewing this card.',
          [{text: 'OK'}],
          {cancelable: true},
        );
      }
    };

    navigation.setOptions({
      headerRight: () => (
        <CrendentialContextMenu
          onDeleteTouched={deleteCard}
          onShowDetailsTouched={showCardDetails}
        />
      ),
    });
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
      {data.length > 1 && (
        <Pagination
          data={data}
          scrollX={scrollX}
          next={next}
          previous={previous}
        />
      )}
    </View>
  );
};
