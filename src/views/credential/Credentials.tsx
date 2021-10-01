import React, {useCallback, useContext} from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Text,
  TouchableHighlight,
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

const {width} = Dimensions.get('window');

const container = css`
  flex: 1;
  flex-direction: column;
  justify-content:center
  align-items: center;
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

  const onCredentialSelected = (item: Credential) => {
    navigation.navigate('Credential', {item});
  };

  return (
    <View style={[container]}>
      {!(credentials && credentials.length) ? (
        <View style={[container]}>
          <Wallet width={180} height={180} />
          <Text style={[largeText]}>Welcome to your wallet!</Text>
          <Text style={[paragraphText]}>Add your first Vaccine Card</Text>
          <TouchableHighlight
            style={[primaryButton(theme)]}
            underlayColor={theme.colors.activeBlue}
            onPress={() => navigation.navigate('CredentialAdd')}>
            <Text style={[primaryButtonText(theme), boldText]}>
              Add a Vaccine Card
            </Text>
          </TouchableHighlight>
        </View>
      ) : (
        <FlatList
          style={[{width}]}
          data={credentials}
          renderItem={({item, index}) => (
            <View
              style={[
                index === 0 && extraMarginTop,
                index === credentials.length - 1 && extraMarginBottom,
              ]}>
              <TouchableHighlight
                key={item.id}
                onPress={() => onCredentialSelected(item)}
                underlayColor={theme.colors.transparent}>
                <CredentialCard
                  name={CredentialHelper.nameForCredential(item.record)}
                  immunizationStatus={CredentialHelper.immunizationStatus(
                    item.record,
                  )}
                  issuedAt={CredentialHelper.issueAtDate(item.record)}
                />
              </TouchableHighlight>
            </View>
          )}
        />
      )}
    </View>
  );
};
