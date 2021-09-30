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
import {startCase, isString} from 'lodash';
import {fullVaxMinRecordCount} from '../constants';

const storageKey = 'shc_vaccinations';

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

  public static async save(records: Array<Credential>): Promise<void> {
    console.log('store credential');

    try {
      const data = records.map(r => ({
        id: r.id,
        record: r.raw,
      }));

      await EncryptedStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      // TODO:(jl) Need to shore up error handling mechanics.
      console.error(error);
    }
  }

  public static async decodeRecord(
    record: string,
  ): Promise<SHCRecord | undefined> {
    try {
      const data: SHCRecord = await SHC.unpackAndVerify(
        record,
        // PHSAPubKey.key,
      );
      console.log('dddddd', data);
      return data;
    } catch (error) {
      // TODO:(jl) Need to shore up error handling mechanics.
      console.error(error);
      return;
    }
  }

  public static async credentials(): Promise<Array<Credential>> {
    let credentials: Array<Credential> = [];

    try {
      const records = await EncryptedStorage.getItem(storageKey);
      if (records) {
        const items = JSON.parse(records);
        for (const i of items) {
          const decoded = await CredentialHelper.decodeRecord(i.record);
          if (decoded) {
            credentials.push({
              id: i.id,
              record: decoded,
              raw: i.record,
            });
          }
        }
      }
    } catch (error) {
      // TODO:(jl) Need to shore up error handling mechanics.
      console.error('Decode error', error);
    } finally {
      return credentials;
    }
  }
}
