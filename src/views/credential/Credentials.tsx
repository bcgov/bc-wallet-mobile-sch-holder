import React, {useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {CredentialHelper} from '../../utils/credhelper';
import {Credential} from '../../types';
import {AppTheme} from '../../../App';

import Wallet from '../../assets/img/wallet.svg';
import {css} from '@emotion/native';
import {ThemeProvider, useTheme} from '@emotion/react';

const flexCenter = css`
  flex-direction: column;
  justify-content:center
  align-items: center;
`;

const paragraphText = css`
  font-size: 18px;
  margin-bottom: 20px;
`;

const largeText = css`
  font-size: 24px;
  margin-bottom: 26px;
`;

const boldText = css`
  font-weight: bold;
`;

const primaryButton = (theme: AppTheme) => css`
  padding: 16px;
  border-radius: 4px;
  background-color: ${theme.colors.primaryBlue};
`;

const primaryButtonText = (theme: AppTheme) => css`
  font-size: 16px;
  color: ${theme.colors.white};
`;

export const Credentials = ({navigation}) => {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useMemo(() => {
    async function wrap() {
      try {
        const credHelper = new CredentialHelper();
        const results = await credHelper.credentials();

        console.log(`Found ${results.length} credentials`);
        setCredentials(results);
      } catch (err) {
        const msg = 'Unable to fetch credentials';
        console.error(msg);
      }
    }
    wrap();
  }, []);

  const theme = useTheme();

  const onCredentialSelected = (item: Credential) => {
    navigation.navigate('DisplayPOV', {
      itemId: item.id,
      record: item.record,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={[flexCenter]}>
        {!(credentials && credentials.length) && (
          <View style={[flexCenter]}>
            <Wallet />
            <Text style={[largeText, boldText]}>Welcome to your wallet!</Text>
            <Text style={[paragraphText]}>Add your first Vaccine Card</Text>
          </View>
        )}
        {credentials && (
          <FlatList
            data={credentials}
            renderItem={({item}) => (
              <TouchableHighlight
                key={item.id}
                onPress={() => onCredentialSelected(item)}
                activeOpacity={0.5}
                underlayColor="light-gray">
                <View style={styles.item}>
                  <Text>Proof of Vaccination for </Text>
                  <Text>
                    {CredentialHelper.fullNameForCredential(item.record)}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          />
        )}
        <TouchableHighlight
          style={[primaryButton(theme as AppTheme)]}
          underlayColor={(theme as AppTheme).colors.activeBlue}
          onPress={() => navigation.navigate('CredentialAdd')}>
          <Text style={[primaryButtonText(theme as AppTheme), boldText]}>
            Add Vaccine Card
          </Text>
        </TouchableHighlight>
      </View>
    </ThemeProvider>
  );
};

// DEPRECATED
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 48,
    flex: 0,
    flexDirection: 'row',
    margin: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
