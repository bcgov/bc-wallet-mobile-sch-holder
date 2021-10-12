import styled, {css} from '@emotion/native';
import React, {useCallback} from 'react';
import {
  BackHandler,
  Dimensions,
  ImageStyle,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {theme} from '../../App';
import {
  boldText,
  paginationStyle,
  paginationStyleItemActive,
  paginationStyleItemInactive,
  primaryButton,
  primaryButtonText,
  text,
} from '../assets/styles';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import Logo from '../assets/img/logo-banner.svg';
import LargeArrow from '../assets/img/large-arrow.svg';
import WelcomeOne from '../assets/img/welcome-1.svg';
import WelcomeTwo from '../assets/img/welcome-2.svg';
import WelcomeThree from '../assets/img/welcome-3.svg';
import WelcomeFour from '../assets/img/welcome-4.svg';

import {SvgProps} from 'react-native-svg';
import {useFocusEffect} from '@react-navigation/native';
import {setTutorialCompletionStatus} from '../utils/storagehelper';

const {width} = Dimensions.get('window');

const container = css`
  align-items: center;
`;

const containerMargin = css`
  margin-top: 16px;
  margin-bottom: 16px;
  ${container}
`;

const flexRow = css`
  flex-direction: row;
  align-items: center;
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

const padding = css`
  padding: 16px;
`;

const centeredText = css`
  text-align: center;
`;

const BlankView = styled.View`
  width: 48px;
  height: 48px;
`;

const walkthrough: {image: React.FC<SvgProps>; text: string}[] = [
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
  console.log('Home');

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
    <ScrollView contentContainerStyle={container}>
      <Logo style={[headerSize as ImageStyle]} width={205} height={80} />
      <Text style={[headerText]}>BC Wallet</Text>
      <SwiperFlatList
        showPagination
        data={walkthrough}
        renderItem={({item, index}) => (
          <View style={[{width}, container]}>
            <View>
              {item.image({
                fill: theme.colors.textGray,
                height: 180,
                width: 180,
              })}
            </View>
            <View style={[container, flexRow, padding]}>
              {index > 0 ? (
                <LargeArrow
                  fill={theme.colors.primaryBlue}
                  height={48}
                  width={48}
                />
              ) : (
                <BlankView />
              )}
              <Text style={[{width: width - 96}, largeText, centeredText]}>
                {item.text}
              </Text>
              {index < walkthrough.length - 1 ? (
                <LargeArrow
                  style={{transform: [{rotate: '180deg'}]}}
                  fill={theme.colors.primaryBlue}
                  height={48}
                  width={48}
                />
              ) : (
                <BlankView />
              )}
            </View>
          </View>
        )}
        paginationStyle={paginationStyle}
        paginationStyleItemInactive={paginationStyleItemInactive}
        paginationStyleItemActive={paginationStyleItemActive}
      />
      <View style={containerMargin}>
        <TouchableHighlight
          style={[primaryButton(theme)]}
          underlayColor={theme.colors.activeBlue}
          onPress={async () => {
            navigation.navigate('Credentials');
            await setTutorialCompletionStatus(true);
          }}
        >
          <Text style={[primaryButtonText(theme), boldText]}>Get started</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};
