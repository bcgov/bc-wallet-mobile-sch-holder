import React, {useEffect, useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {CredentialHelper} from '../../utils/credhelper';
import {Credential} from '../../types';
import {AppTheme} from '../../../App';

import styled, {css} from '@emotion/native';
import {ThemeProvider, useTheme} from '@emotion/react';

import Wallet from '../../assets/img/wallet.svg';
import {boldText} from '../../assets/styles';
import {useIsFocused} from '@react-navigation/native';
import CredentialCard from '../../components/credential/CredentialCard';

const CredentialList = styled.FlatList`
  padding: 32px 16px 16px 16px;
`;

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

const primaryButton = (theme: AppTheme) => css`
  padding: 16px 32px;
  border-radius: 4px;
  background-color: ${theme.colors.primaryBlue};
`;

const primaryButtonText = (theme: AppTheme) => css`
  font-size: 18px;
  color: ${theme.colors.white};
`;

export const Credentials = ({navigation}) => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const isFocused = useIsFocused();
  const theme = useTheme() as AppTheme;

  useEffect(() => {
    async function wrap() {
      try {
        const credHelper = new CredentialHelper();
        const results = await credHelper.credentials();
        console.debug(`Found ${results.length} credentials`);
        if (results?.length) {
          setCredentials(results);
        }
        // credHelper.clearAllCredentials();
      } catch (err) {
        const msg = 'Unable to fetch credentials';
        console.error(msg);
      }
    }
    wrap();
  }, [isFocused]);

  const onCredentialSelected = (item: Credential) => {
    navigation.navigate('Credential', {
      itemId: item.id,
      record: item.record,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={[flexCenter]}>
        {!(credentials && credentials.length) ? (
          <View style={[flexCenter]}>
            <Wallet />
            <Text style={[largeText, boldText]}>Welcome to your wallet!</Text>
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
          <CredentialList
            data={credentials}
            renderItem={({item}) => (
              <TouchableHighlight
                key={item.id}
                onPress={() => onCredentialSelected(item)}
                activeOpacity={0.5}
                underlayColor="light-gray">
                <CredentialCard
                  name={CredentialHelper.fullNameForCredential(item.record)}
                  immunizationStatus={CredentialHelper.immunizationStatus(
                    item.record,
                  )}
                  issued="Mar 31, 2021"
                />
              </TouchableHighlight>
            )}
          />
        )}
      </View>
    </ThemeProvider>
  );
};
