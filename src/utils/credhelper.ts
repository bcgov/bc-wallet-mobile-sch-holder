import EncryptedStorage from 'react-native-encrypted-storage';
// import {PHSAPubKey} from '../constants';
import {SHCRecord, Credential, FhirBundleResourceType} from '../types';
// @ts-ignore
import * as SHC from '@pathcheck/shc-sdk';
import {startCase} from 'lodash';
import {fullVaxMinRecordCount} from '../constants';

const storageKey = 'shc_vaccinations';

export enum ImmunizationStatus {
  Partial,
  Full,
}

export class CredentialHelper {
  public static fullNameForCredential(item: SHCRecord): string {
    const results = item.vc.credentialSubject.fhirBundle.entry.filter(
      (e: any) => e.resource.resourceType === FhirBundleResourceType.Patient,
    );

    if (results.length === 0) {
      console.error('Unable to find Person record');
      return 'Unknown Name';
    }

    const person = results.pop();
    const [name] = person.resource.name;
    const {family, given} = name;
    const fullNameAsStartCase = `${startCase(
      family.toLowerCase(),
    )}, ${startCase(given.join(' ').toLowerCase())}`;

    return fullNameAsStartCase;
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

  public static async decodeRecord(record: string): Promise<SHCRecord> {
    try {
      const data: SHCRecord = await SHC.unpackAndVerify(
        record,
        // PHSAPubKey.key,
      );

      return data;
    } catch (error) {
      // TODO:(jl) Need to shore up error handling mechanics.
      console.error(error);
    }
  }

  public static async credentials(): Promise<Array<Credential>> {
    let credentials: Array<Credential> = [];

    try {
      const records = await EncryptedStorage.getItem(storageKey);
      if (records) {
        const items = JSON.parse(records);
        for (const i of items) {
          const decoded: SHCRecord = await CredentialHelper.decodeRecord(
            i.record,
          );
          credentials.push({
            id: i.id,
            record: decoded,
            raw: i.record,
          });
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
