import EncryptedStorage from 'react-native-encrypted-storage';
import {PHSAPubKey} from '../constants';
import {SHCRecord, Credential} from '../types';
// @ts-ignore
import * as SHC from '@pathcheck/shc-sdk';
import {startCase} from 'lodash';

export class CredentialHelper {
  private storageKey = 'shc_vaccinations';

  public static fullNameForCredential(item: SHCRecord): string {
    const results = item.vc.credentialSubject.fhirBundle.entry.filter(
      (e: any) => e.resource.resourceType === 'Patient',
    );

    if (results.length === 0) {
      console.error('Unable to find Person record');
      return 'Unknow Name';
    }

    const person = results.pop();
    const [name] = person.resource.name;
    const {family, given} = name;
    const fullName = `${family}, ${given.join(' ')}`.toLocaleLowerCase();
    const fullNameAsStartCase = startCase(fullName);

    return fullNameAsStartCase;
  }

  async credentials(): Promise<Array<Credential>> {
    let credentials = [];
    try {
      const qrCodeUrls = await EncryptedStorage.getItem(this.storageKey);

      if (qrCodeUrls) {
        const shcUrls = JSON.parse(qrCodeUrls);

        for (const u of shcUrls) {
          const record: SHCRecord = await SHC.unpackAndVerify(
            u.record,
            PHSAPubKey.key,
          );
          credentials.push({
            id: u.id,
            record,
          });
        }
      }
    } catch (error) {
      // TODO:(jl) Need to shore up error handling mechanics.
      console.error(error);
    } finally {
      return credentials;
    }
  }

  async storeCredential(record: string): Promise<void> {
    try {
      let shcVaccinations = [];
      const storedShcVaccinations = await EncryptedStorage.getItem(
        this.storageKey,
      );

      if (storedShcVaccinations) {
        shcVaccinations = JSON.parse(storedShcVaccinations);
      }

      shcVaccinations.push({
        record,
        id: Date.now(),
      });

      await EncryptedStorage.setItem(
        this.storageKey,
        JSON.stringify(shcVaccinations),
      );
    } catch (error) {
      // TODO:(jl) Need to shore up error handling mechanics.
      console.error(error);
    }
  }

  async clearAllCredentials(): Promise<void> {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      // TODO:(jl) Need to shore up error handling mechanics.
      console.error(error);
    }
  }
}
