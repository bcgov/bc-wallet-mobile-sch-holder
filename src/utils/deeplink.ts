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
