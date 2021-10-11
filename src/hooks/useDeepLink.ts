import {useContext, useEffect} from 'react';
import {Linking} from 'react-native';
import {CredentialHelper} from '../utils/credhelper';
import {Context} from '../Store';
import {DispatchAction} from '../Reducer';
import RNQRGenerator from 'rn-qr-generator';
import {deepLinkProtocol} from '../constants';

export const handleDeepLink = async (aUrl: string): Promise<string> => {
  try {
    const url = new URL(aUrl);

    if (url.protocol.slice(0, -1) !== deepLinkProtocol) {
      throw Error('Invalid deep link protocol');
    }

    const data = url.searchParams.get('data');
    if (!data) {
      throw Error('Unexpected URI format');
    }

    const decoded = decodeURIComponent(data);
    const options = {base64: decoded};
    const response = await RNQRGenerator.detect(options);
    const {values} = response;

    if (values.length === 0) {
      throw Error('No QR images detected');
    }

    return values.pop()!;
  } catch (err) {
    throw err;
  }
};

export const useDeepLinking = () => {
  console.log('Using deep linking');

  const listenerEventType = 'url';
  const [, dispatch] = useContext(Context);

  useEffect(() => {
    if (Linking.listenerCount(listenerEventType) > 1) {
      console.log('Listening for deep link already. Skipping.');
      return;
    }

    console.log('Adding deep link listener callback');
    Linking.addEventListener(
      listenerEventType,
      async (event: {url: string}): Promise<void> => {
        console.log('Trigger deep link listener callback');

        try {
          const {url} = event;
          const value = await handleDeepLink(url);
          const record = await CredentialHelper.decodeRecord(value);

          console.log('Dispatch deep link event');
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
      console.log('Cleanup deep link');
      Linking.removeAllListeners(listenerEventType);
    };
  }, [dispatch]);
};
