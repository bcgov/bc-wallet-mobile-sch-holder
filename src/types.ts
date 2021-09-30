export interface State {
  credentials: Array<any>;
  error: Error | null;
}

export interface JWKSKey {
  kty: string;
  kid: string;
  use: string;
  alg: string;
  crv: string;
  x: string;
  y: string;
}

export interface JWKS {
  type: string;
  debugPath: string;
  key: JWKSKey;
}

// SHC Spec https://spec.smarthealth.cards/#protocol-details
export interface SHCRecord {
  iss: string; // issuer
  nbf: number; // not before
  vc: SHCVerifiableCredential; // verified credential
}

export interface Credential {
  id: number;
  record: SHCRecord;
  raw: string;
}

export interface SHCVerifiableCredential {
  type: Array<string>;
  credentialSubject: any;
}

// FHIR - Fast Health Interoperability Resources
export interface SHCCredentialSubject {
  FHIRVersion: string;
  FHIRBundle: SHCFhirBundle;
}

export enum FhirBundleResourceType {
  Immunization = 'Immunization',
  Patient = 'Patient',
}

export interface SHCFhirBundle {
  resourceType: string;
  type: FhirBundleResourceType;
  entry: Array<object>;
}

export interface SHCFhirBundleEntry {
  fullUrl: string;
  resource: object; //TODO:(jl) Need to define additional types.
}
