import React, {useCallback, useContext, useEffect} from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Linking,
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
import {handleDeepLink} from '../../utils/deeplink';
import {DispatchAction} from '../../Reducer';

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
  console.log('Credentials');

  const listenerEventType = 'url';
  const [state] = useContext(Context);
  const {credentials} = state;
  const [, dispatch] = useContext(Context);
  // const listenerCount = useRef(Linking.listenerCount(listenerEventType));

  useEffect(() => {
    console.log('Setup listener.......');

    if (Linking.listenerCount(listenerEventType) >= 1) {
      return;
    }

    Linking.addEventListener(
      listenerEventType,
      async (event: {url: string}): Promise<void> => {
        try {
          const {url} = event;
          const value = await handleDeepLink(url);
          const record = await CredentialHelper.decodeRecord(value);

          dispatch({
            type: DispatchAction.AddCredential,
            payload: [{id: Date.now(), record, raw: value}],
          });
        } catch (err) {
          console.log(err);
        }
      },
    );

    // cleanup
    return () => {
      Linking.removeAllListeners(listenerEventType);
    };
  }, [dispatch]);

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
            onPress={() => navigation.navigate('CredentialAdd')}
          >
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
      )}
    </View>
  );
};
