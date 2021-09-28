import styled, {css} from '@emotion/native';
import React from 'react';
import {
  Dimensions,
  ImageStyle,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Props, theme} from '../../App';
import {
  boldText,
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

const {width} = Dimensions.get('window');

const containerView = css`
  align-items: center;
`;

const containerViewCenter = css`
  margin-top: 16px;
  margin-bottom: 16px;
  ${containerView}
`;

const containerRow = css`
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

const paginationStyle = css`
  position: relative;
`;

const paginationStyleItemActive = css`
  width: 10px;
  height: 10px;
  background-color: ${theme.colors.primaryBlue};
`;

const paginationStyleItemInactive = css`
  width: 10px;
  height: 10px;
  background-color: ${theme.colors.transparent};
  border: 1px solid ${theme.colors.primaryBlue};
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

export const Home = ({navigation}: Props) => (
  <ScrollView contentContainerStyle={containerView}>
    <Logo style={[headerSize as ImageStyle]} width={205} height={80} />
    <Text style={[headerText]}>BC Wallet</Text>
    <SwiperFlatList
      showPagination
      data={walkthrough}
      renderItem={({item, index}) => (
        <View style={[{width}, containerView]}>
          <View>
            {item.image({fill: theme.colors.textGray, height: 180, width: 180})}
          </View>
          <View style={[containerView, containerRow]}>
            {index > 0 ? (
              <TouchableWithoutFeedback>
                <LargeArrow
                  fill={theme.colors.primaryBlue}
                  height={48}
                  width={48}
                />
              </TouchableWithoutFeedback>
            ) : (
              <BlankView />
            )}
            <Text
              style={[{width: width - 96}, largeText, centeredText, padding]}>
              {item.text}
            </Text>
            {index < walkthrough.length - 1 ? (
              <TouchableWithoutFeedback>
                <LargeArrow
                  style={{transform: [{rotate: '180deg'}]}}
                  fill={theme.colors.primaryBlue}
                  height={48}
                  width={48}
                />
              </TouchableWithoutFeedback>
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
    <View style={containerViewCenter}>
      <TouchableHighlight
        style={[primaryButton(theme)]}
        underlayColor={theme.colors.activeBlue}
        onPress={() => navigation.navigate('Credentials')}>
        <Text style={[primaryButtonText(theme), boldText]}>Get started</Text>
      </TouchableHighlight>
    </View>
  </ScrollView>
);
