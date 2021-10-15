import React, {useCallback, useContext} from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {CredentialHelper} from '../../utils/credhelper';
import {Credential} from '../../types';
import {theme} from '../../../App';
import {css} from '@emotion/native';
import Wallet from '../../assets/img/wallet.svg';
import {boldText, text} from '../../assets/styles';
import {useFocusEffect} from '@react-navigation/native';
import CredentialCard from '../../components/credential/CredentialCard';
import {primaryButton, primaryButtonText} from '../../assets/styles';
import {Context} from '../../Store';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LocalizationContext} from '../../LocalizationProvider';

const {width} = Dimensions.get('window');

const flex = css`
  flex: 1;
`;

const container = css`
  align-items: center;
`;

const containerCenter = css`
  ${container}
  justify-content: center;
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

const paragraphText = css`
  ${text}
  font-size: 16px;
  margin-bottom: 20px;
`;

const largeText = css`
  ${boldText}
  font-size: 20px;
  margin-bottom: 16px;
`;

const extraMarginTop = css`
  margin-top: 24px;
`;

const extraMarginBottom = css`
  margin-bottom: 24px;
`;

export const Credentials: React.FC<any> = ({navigation}) => {
  console.log('Credentials');

  const {translations} = useContext(LocalizationContext);
  const [state] = useContext(Context);
  const {credentials} = state;

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

  const onCredentialSelected = (credential: Credential) => {
    navigation.navigate('Credential', {credential});
  };

  if (!(credentials && credentials.length)) {
    return (
      <SafeAreaView style={[containerFlex]}>
        <View style={[flex, containerCenter]}>
          <Wallet width={180} height={180} />
          <Text style={[largeText]}>{translations.Welcome}</Text>
          <Text style={[paragraphText]}>{translations.AddFirst}</Text>
        </View>
        <View style={[containerMargin]}>
          <TouchableHighlight
            style={[primaryButton(theme)]}
            underlayColor={theme.colors.activeBlue}
            onPress={() => navigation.navigate('CredentialAdd')}
          >
            <Text style={[primaryButtonText(theme), boldText]}>
              {translations.AddVaccineCard}
            </Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={[containerFlex]}>
        <FlatList
          style={[{width}]}
          data={credentials}
          renderItem={({item, index}) => (
            <View
              style={[
                index === 0 && extraMarginTop,
                index === credentials.length - 1 && extraMarginBottom,
              ]}
            >
              <TouchableOpacity
                key={item.id}
                onPress={() => onCredentialSelected(item)}
                activeOpacity={0.8}
              >
                <CredentialCard
                  name={CredentialHelper.nameForCredential(item.record)}
                  immunizationStatus={CredentialHelper.immunizationStatus(
                    item.record,
                  )}
                  issuedAt={CredentialHelper.issueAtDate(item.record)}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
};
