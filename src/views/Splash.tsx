import React, {useContext, useMemo} from 'react';
import {css} from '@emotion/native';
import {ActivityIndicator} from 'react-native';
import {theme} from '../../App';
import DarkSafeAreaView from '../components/layout/DarkSafeAreaView';
import Logo from '../assets/img/logo-light.svg';
import {CredentialHelper} from '../utils/credhelper';
import {Context} from '../Store';
import {DispatchAction} from '../Reducer';
import {tutorialCompletionStatus} from '../utils/storagehelper';

const container = css`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Splash: React.FC<any> = ({navigation}) => {
  console.log('Splash');
  const [, dispatch] = useContext(Context);

  useMemo(() => {
    async function init() {
      let results = [];
      try {
        results = await CredentialHelper.credentials();
        if (results.length > 0) {
          dispatch({type: DispatchAction.SetCredentials, payload: results});
        }
      } catch (error) {
        console.error(error);
      } finally {
        // await deleteTutorialCompletionStatus();

        const tutorialState = await tutorialCompletionStatus();
        if (results.length > 0 || tutorialState) {
          navigation.navigate('Credentials');
          return;
        }

        navigation.navigate('Home');
      }
    }
    init();
  }, [dispatch, navigation]);

  return (
    <DarkSafeAreaView style={[container]}>
      <Logo width={250} height={250} />
      <ActivityIndicator color={theme.colors.white} />
    </DarkSafeAreaView>
  );
};
