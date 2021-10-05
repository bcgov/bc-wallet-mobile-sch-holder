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
import {startCase} from 'lodash';
import {fullVaxMinRecordCount} from '../constants';

const storageKey = 'shc_vaccinations';

export enum ImmunizationStatus {
  Partial,
  Full,
}

export class CredentialHelper {
  private storageKey = 'shc_vaccinations';

  public static patientForRecord = (item: SHCRecord) => {
    return item.vc.credentialSubject.fhirBundle.entry.filter(
      (e: any) => e.resource.resourceType === FhirBundleResourceType.Patient,
    );
  };

  public static immunizationsForRecord = (item: SHCRecord) => {
    return item.vc.credentialSubject.fhirBundle.entry.filter(
      (e: any) =>
        e.resource.resourceType === FhirBundleResourceType.Immunization,
    );
  };

  public static familyNameForCredential(name?: PersonName): string | undefined {
    if (!name) {
      return;
    }
    const {family} = name;
    return startCase(family.toLowerCase());
  }

  public static givenNameForCredential(name?: PersonName): string | undefined {
    if (!name) {
      return;
    }
    const {given} = name;
    return startCase(given.join(' ').toLowerCase());
  }

  public static fullNameForCredential(name?: PersonName): string | undefined {
    if (!name) {
      return;
    }
    return `${this.familyNameForCredential(
      name,
    )}, ${this.givenNameForCredential(name)}`;
  }

  public static nameForCredential(item: SHCRecord): PersonName | undefined {
    const results = this.patientForRecord(item);

    if (results.length === 0) {
      console.error('Unable to find Person record');
    }

    const person = results.pop();
    const [name] = person?.resource?.name;
    return name;
  }

  public static dobForCredential(item: SHCRecord): string | undefined {
    const results = this.patientForRecord(item);

    if (results.length === 0) {
      console.error('Unable to find Person record');
      return;
    }

    const person = results.pop();
    return person?.resource?.birthDate;
  }

  public static lotNumberForImmnunization(
    immunuzation?: any,
  ): string | undefined {
    if (!immunuzation) {
      return;
    }

    return immunuzation?.resource?.lotNumber;
  }

  public static dateForImmnunization(immunuzation?: any): string | undefined {
    if (!immunuzation) {
      return;
    }

    return immunuzation?.resource?.occurrenceDateTime;
  }

  public static providerForImmnunization(
    immunuzation?: any,
  ): string | undefined {
    if (!immunuzation) {
      return;
    }

    if (
      !(
        immunuzation?.resource?.performer &&
        immunuzation?.resource?.performer.length
      )
    ) {
      return;
    }

    return immunuzation?.resource?.performer[0]?.actor?.display;
  }

  public static immunizationStatus(item: SHCRecord): ImmunizationStatus {
    const results = this.immunizationsForRecord(item);

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

  public static async decodeRecord(
    record: string,
  ): Promise<SHCRecord | undefined> {
    try {
      const data: SHCRecord = await SHC.unpackAndVerify(
        record,
        // PHSAPubKey.key,
      );

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

  public static credentialExists(
    item: Credential,
    credentials: Array<Credential>,
  ): boolean {
    const matches = credentials.filter(credential => {
      return credential.raw === item.raw;
    });

    if (matches.length !== 0) {
      return true;
    }

    return false;
  }
}
