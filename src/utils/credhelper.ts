import EncryptedStorage from 'react-native-encrypted-storage';
// import {PHSAPubKey} from '../constants';
import {
  SHCRecord,
  Credential,
  FhirBundleResourceType,
  PersonName,
} from '../types';
// @ts-ignore
import * as SHC from '@pathcheck/shc-sdk';
import {startCase, isArray, isString} from 'lodash';
import {fullVaxMinRecordCount} from '../constants';

export enum ImmunizationStatus {
  Partial,
  Full,
}

export class CredentialHelper {
  private storageKey = 'shc_vaccinations';

  public static familyNameForCredential(name: PersonName | string): string {
    if (isString(name)) {
      return name;
    }
    const {family} = name;
    return startCase(family.toLowerCase());
  }

  public static givenNameForCredential(name: PersonName | string): string {
    if (isString(name)) {
      return name;
    }
    const {given} = name;
    return startCase(given.join(' ').toLowerCase());
  }

  public static fullNameForCredential(name: PersonName | string): string {
    if (isString(name)) {
      return name;
    }
    return `${this.familyNameForCredential(
      name,
    )}, ${this.givenNameForCredential(name)}`;
  }

  public static nameForCredential(item: SHCRecord): PersonName | string {
    const results = item.vc.credentialSubject.fhirBundle.entry.filter(
      (e: any) => e.resource.resourceType === FhirBundleResourceType.Patient,
    );

    if (results.length === 0) {
      console.error('Unable to find Person record');
      return 'Unknown Name';
    }

    const person = results.pop();
    const [name] = person.resource.name;
    return name;
  }

  // @ts-ignore
  public static immunizationStatus(item: SHCRecord): ImmunizationStatus {
    const results = item.vc.credentialSubject.fhirBundle.entry.filter(
      (e: any) =>
        e.resource.resourceType === FhirBundleResourceType.Immunization,
    );

    return results.length >= fullVaxMinRecordCount
      ? ImmunizationStatus.Full
      : ImmunizationStatus.Partial;
  }

  public static issueAtDate(item: SHCRecord): Date {
    // As per RFC 7519, the nbf ("not before") property of
    // the JWT claim is the issuance date encoded as
    // the number of **seconds** from 1970-01-01T00:00:00Z UTC
    return new Date(item.nbf * 1000);
  }

  async decodeRecords(records: Array<any>): Promise<Array<Credential>> {
    let credentials: Array<Credential> = [];

    if (!records || !isArray(records)) {
      return [];
    }

    try {
      for (const u of records) {
        const record: SHCRecord = await SHC.unpackAndVerify(
          u.record,
          // PHSAPubKey.key,
        );

        credentials.push({
          id: u.id,
          record,
        });
      }
    } catch (error) {
      // TODO:(jl) Need to shore up error handling mechanics.
      console.error(error);
    } finally {
      return credentials;
    }
  }

  async credentials(): Promise<Array<Credential>> {
    let credentials: Array<Credential> = [];

    try {
      const qrCodeUrls = await EncryptedStorage.getItem(this.storageKey);
      if (qrCodeUrls) {
        const data = JSON.parse(qrCodeUrls);
        credentials = await this.decodeRecords(data);
      }
    } catch (error) {
      // TODO:(jl) Need to shore up error handling mechanics.
      console.error('Decode error', error);
    } finally {
      return credentials;
    }
  }

  async credentialWithId(
    itemId: number,
    raw: boolean = false,
  ): Promise<Credential | undefined> {
    try {
      const qrCodeUrls = await EncryptedStorage.getItem(this.storageKey);

      if (qrCodeUrls) {
        const shcUrls = JSON.parse(qrCodeUrls);
        const record = shcUrls.filter((u: any) => u.id === itemId);

        if (raw) {
          return record.pop();
        }

        return (await this.decodeRecords(record)).pop();
      }
    } catch (err) {
      console.error('Fail');
    }
  }

  async storeCredential(record: string): Promise<void> {
    console.log('store credential');

    try {
      let shcVaccinations = [];
      const storedShcVaccinations = await EncryptedStorage.getItem(
        this.storageKey,
      );

      if (storedShcVaccinations) {
        shcVaccinations = JSON.parse(storedShcVaccinations);
        console.log(`Found ${shcVaccinations.lenght} existing creds`);
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
