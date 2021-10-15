import {css} from '@emotion/native';
import React, {Ref, useCallback, useContext, useRef, useState} from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  FlatList,
  ImageStyle,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {theme} from '../../App';
import {
  boldText,
  primaryButton,
  primaryButtonText,
  text,
} from '../assets/styles';

import Logo from '../assets/img/logo-banner.svg';
import WelcomeOne from '../assets/img/welcome-1.svg';
import WelcomeTwo from '../assets/img/welcome-2.svg';
import WelcomeThree from '../assets/img/welcome-3.svg';
import WelcomeFour from '../assets/img/welcome-4.svg';

import {SvgProps} from 'react-native-svg';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Pagination} from '../components/shared/Pagination';
import {LocalizationContext} from '../LocalizationProvider';
import {setTutorialCompletionStatus} from '../utils/storagehelper';

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

const containerMargin = css`
  margin-top: 16px;
  margin-bottom: 32px;
  ${container}
`;

const largeText = css`
  ${text}
  font-size: 18px;
  color: ${theme.colors.textGray};
`;

const headerText = css`
  ${boldText}
  font-size: 32px;
  color: ${theme.colors.textGray};
`;

const headerSize = css`
  width: ${width};
`;

const margin = css`
  margin: 16px;
`;

const centeredText = css`
  text-align: center;
`;

export const Home: React.FC<any> = ({navigation}) => {
  const {translations} = useContext(LocalizationContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatList: Ref<FlatList> = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const onViewableItemsChangedRef = useRef(({viewableItems}: any) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {
      useNativeDriver: false,
    },
  );

  const next = () => {
    if (activeIndex + 1 < data.length) {
      flatList?.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };
  const previous = () => {
    if (activeIndex !== 0) {
      flatList?.current?.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  };

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: {image: React.FC<SvgProps>; text: string};
      index: number;
    }) => (
      <View key={index} style={[{width}, container]}>
        {item.image({
          fill: theme.colors.textGray,
          height: 180,
          width: 180,
        })}
        <Text style={[largeText, centeredText, margin]}>{item.text}</Text>
      </View>
    ),
    [],
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const data: {image: React.FC<SvgProps>; text: string}[] = [
    {
      image: WelcomeOne,
      text: translations.WalkthroughOne,
    },
    {
      image: WelcomeTwo,
      text: translations.WalkthroughTwo,
    },
    {
      image: WelcomeThree,
      text: translations.WalkthroughThree,
    },
    {
      image: WelcomeFour,
      text: translations.WalkthroughFour,
    },
  ];

  return (
    <SafeAreaView style={[containerFlex]}>
      <Logo style={[headerSize as ImageStyle]} width={205} height={80} />
      <Text style={[headerText]}>BC Wallet</Text>
      <FlatList
        ref={flatList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={[{width}]}
        data={data}
        renderItem={renderItem}
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
      <View style={[containerMargin]}>
        <TouchableHighlight
          style={[primaryButton(theme)]}
          underlayColor={theme.colors.activeBlue}
          onPress={async () => {
            await setTutorialCompletionStatus(true);
            navigation.navigate('Credentials');
          }}
        >
          <Text style={[primaryButtonText(theme), boldText]}>Get started</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
