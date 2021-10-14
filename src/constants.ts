import {JWKS} from './types';

export const defaultLanguage = 'en';

export const deepLinkProtocol = 'bcwallet';

export enum LocalStorageKeys {
  SHC = 'shc_vaccinations',
  TutorialStatus = 'tutorial_status',
}

export const healthGatewayURL =
  'https://www.healthgateway.gov.bc.ca/vaccinecard';

// JSON Web Key containing the PHSA's key used to sign all
// vaccination verification records. This is public data
// located and the `debugPath` URL below.
export const PHSAPubKey: JWKS = {
  type: 'URL',
  debugPath: 'https://smarthealthcard.phsa.ca/v1/issuer/.well-known/jwks.json',
  key: {
    kty: 'EC',
    kid: 'XCqxdhhS7SWlPqihaUXovM_FjU65WeoBFGc_ppent0Q',
    use: 'sig',
    alg: 'ES256',
    crv: 'P-256',
    x: 'xscSbZemoTx1qFzFo-j9VSnvAXdv9K-3DchzJvNnwrY',
    y: 'jA5uS5bz8R2nxf_TU-0ZmXq6CKWZhAG1Y4icAx8a9CA',
  },
};

// The number of Vaccination records required to be
// considered fully vaccinated.
export const fullVaxMinRecordCount = 2;

export const CVXCodes: Record<string, string> = {
  '207': 'Moderna Spikevax COVID-19 vaccine',
  '208': 'Pfizer-BioNTech Comirnaty COVID-19 vaccine',
  '211': 'Novavax COVID-19 vaccine',
  '212': 'Jansen (Johnson & Johnson) COVID-19 vaccine',
  '213': 'Unspecified COVID-19 vaccine',
  '500': 'Unspecified COVID-19 vaccine',
  '501': 'QazCovid-in COVID-19 vaccine',
  '502': 'Covaxin COVID-19 vaccine',
  '503': 'CoviVac COVID-19 vaccine',
  '504': 'Sputnik Light COVID-19 vaccine',
  '505': 'Sputnik V COVID-19 vaccine',
  '506': 'CanSInoBlo COVID-19 vaccine',
  '507': 'Anhui Zhifei Longcom COVID-19 vaccine',
  '508':
    'Jiangsu Province Centers for Disease Control and Prevention COVID-19 vaccine',
  '509': 'EpiVacCorona COVID-19 vaccine',
  '510': 'Sinopharm COVID-19 vaccine',
  '511': 'Sinovac-CoronaVac COVID-19 vaccine',
};

export const SNOMEDCodes: Record<string, string> = {
  '28761000087108': 'AstraZeneca Vaxzevria COVID-19 vaccine',
  '28961000087105': 'Covishield COVID-19 vaccine',
};

export const CVXSystem = 'http://hl7.org/fhir/sid/cvx';
export const SNOMEDSystem = 'http://snomed.info/sct';
