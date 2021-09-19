import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

export const Credentials = () => {
  const [url, setUrl] = useState(null);

  const retrieveQrCodeUrl = async () => {
    try {
      const qrCodeUrl = await EncryptedStorage.getItem('shc_vaccination');

      if (qrCodeUrl) {
        setUrl(JSON.parse(qrCodeUrl).url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveQrCodeUrl();
  }, []);

  return (
    <View>
      {url && (
        <FlatList data={[url]} renderItem={({ item }) => <Text>{item}</Text>} />
      )}
    </View>
  );
};
