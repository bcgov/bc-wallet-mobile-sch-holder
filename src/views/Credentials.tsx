import React, { useMemo, useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {CredentialHelper} from '../utils/credhelper';
import {Credential} from '../types';

export const Credentials = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [modalUrl, setModalUrl] = useState(null);

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
    <View style={styles.container}>
      {credentials && (
        <FlatList
          data={credentials}
          renderItem={({item}) => (
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
                {/* <QRCode value={item.url} quietZone={5} size={48} />
                <View style={{ justifyContent: 'space-between', padding: 2 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    Smart Health Card Vaccination
                  </Text>
                  <Text>Added: {formatDate(item.date)}</Text>
                </View> */}
              </View>
            </TouchableHighlight>
          )}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!modalUrl}
        onRequestClose={() => setModalUrl(null)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text numberOfLines={1} style={{ padding: 48 }}>
              {modalUrl}
            </Text>
            <QRCode value={modalUrl || ''} size={300} />
            <Button title="Close" onPress={() => setModalUrl(null)} />
          </View>
        </View>
      </Modal>
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

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
