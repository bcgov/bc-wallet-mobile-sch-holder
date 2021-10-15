import {css} from '@emotion/native';
import React, {useCallback} from 'react';
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
import {ScalingDot} from 'react-native-animated-pagination-dots';

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

// const flexRow = css`
//   flex-direction: row;
//   align-items: center;
// `;

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

const data: {image: React.FC<SvgProps>; text: string}[] = [
  {
    image: WelcomeOne,
    text: 'Keep your BC Vaccine Cards on your smartphone',
  },
  {
    image: WelcomeTwo,
    text: 'Update it from a QR Code or from Health Gateway',
  },
  {
    image: WelcomeThree,
    text: 'Add multiple Vaccine Cards and quickly swipe through them',
  },
  {
    image: WelcomeFour,
    text: 'In the future, keep other credentials securely in your wallet',
  },
];

export const Home: React.FC<any> = ({navigation}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {
      useNativeDriver: false,
    },
  );

  const renderItem = ({
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

  return (
    <SafeAreaView style={[containerFlex]}>
      <Logo style={[headerSize as ImageStyle]} width={205} height={80} />
      <Text style={[headerText]}>BC Wallet</Text>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={[{width}]}
        data={data}
        renderItem={renderItem}
        onScroll={onScroll}
      />
      <View>
        <ScalingDot
          data={data}
          scrollX={scrollX}
          inActiveDotColor={theme.colors.primaryBlue}
          activeDotColor={theme.colors.primaryBlue}
          activeDotScale={1}
        />
      </View>
      <View style={[containerMargin]}>
        <TouchableHighlight
          style={[primaryButton(theme)]}
          underlayColor={theme.colors.activeBlue}
          onPress={() => navigation.navigate('Credentials')}>
          <Text style={[primaryButtonText(theme), boldText]}>Get started</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
