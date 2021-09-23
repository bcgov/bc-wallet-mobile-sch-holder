import {JWKS} from './types';

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
