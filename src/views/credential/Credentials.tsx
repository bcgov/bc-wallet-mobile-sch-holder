import React, { useMemo, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { CredentialHelper } from '../../utils/credhelper';
import { Credential } from '../../types';

export const Credentials = ({ navigation }) => {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useMemo(() => {
    async function wrap() {
      try {
        const credHelper = new CredentialHelper();
        const results = await credHelper.credentials();
        setCredentials(results);
      } catch (err) {
        const msg = 'Unable to fetch credentials';
        console.error(msg);
      }
    }
    wrap();
  }, []);

  return (
    <View>
      {credentials && (
        <FlatList
          data={credentials}
          renderItem={({ item }) => (
            <TouchableHighlight
              key={item.id}
              // onPress={}
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
      <Button
        title="Add Vaccine Card"
        onPress={() => navigation.navigate('CredentialAdd')}
      />
    </View>
  );
};

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
