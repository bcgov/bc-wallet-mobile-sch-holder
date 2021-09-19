import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import QRCode from 'react-native-qrcode-svg';

export const Credentials = () => {
  const [urls, setUrls] = useState(null);
  const [modalUrl, setModalUrl] = useState(null);

  const retrieveQrCodeUrls = async () => {
    let urls = [];
    try {
      const qrCodeUrls = await EncryptedStorage.getItem('shc_vaccinations');
      if (qrCodeUrls) {
        urls = JSON.parse(qrCodeUrls);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUrls(urls.filter(url => !!url));
    }
  };

  useEffect(() => {
    retrieveQrCodeUrls();
  }, []);

  return (
    <View style={styles.container}>
      {urls && (
        <FlatList
          data={urls}
          renderItem={({ item }) => (
            <TouchableHighlight
              key={item.date}
              onPress={() => setModalUrl(item.url)}
              activeOpacity={0.5}
              underlayColor="light-gray">
              <View style={styles.item}>
                <QRCode value={item.url} quietZone={5} size={48} />
                <View style={{ justifyContent: 'space-between', padding: 2 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    Smart Health Card Vaccination
                  </Text>
                  <Text>Added: {formatDate(item.date)}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      )}
      <Button
        title="Clear Credentials"
        onPress={async () => {
          await EncryptedStorage.clear();
          await retrieveQrCodeUrls();
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!modalUrl}
        onRequestClose={() => setModalUrl(null)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
