import React, {useMemo, useState} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {CredentialHelper} from '../utils/credhelper';

export interface IRouteProps {
  navigation: any;
  route: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
  header: {
    fontFamily: 'BCSans-Bold',
    fontSize: 36,
    color: '#313132',
  },
  text: {
    fontFamily: 'BCSans-Regular',
    fontSize: 26,
    color: '#313132',
  },
  line: {
    display: 'flex',
    height: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: '#313132',
  },
  qr: {
    display: 'flex',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const DisplayPOV: React.FC<IRouteProps> = ({route}) => {
  // @ts-ignore
  const {itemId, record} = route.params;
  const [data, setData] = useState<string>('no data');

  useMemo(() => {
    async function wrap() {
      try {
        const credHelper = new CredentialHelper();
        const results = await credHelper.credentialWithId(itemId, true);
        if (!results) {
          return;
        }

        // @ts-ignore
        setData(results.record);
      } catch (err) {
        const msg = 'Unable to fetch credentials';
        console.error(msg);
      }
    }
    wrap();
  }, [itemId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Proof of Vaccination</Text>
        <View style={styles.line} />
        <Text style={styles.text}>
          {CredentialHelper.fullNameForCredential(record)}
        </Text>
        <View style={styles.qr}>
          <QRCode value={data} quietZone={5} size={320} />
        </View>
      </View>
    </SafeAreaView>
  );
};
