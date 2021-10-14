# BC Wallet

## Overview

BC Wallet is a digital wallet app for holding and presenting [BC Vaccine Cards](https://www2.gov.bc.ca/gov/content/covid-19/vaccine/proof) in the [SMART Health Card (SHC)](https://smarthealth.cards) format. It's developed by the Government of British Columbia in Canada using open source code, and will be available for iOS and Android from the App Store and Google Play store.

Vaccine cards can be added to the wallet in one of three ways:
1. Scanning an existing SHC QR Code using the phone's camera
2. Selecting a photo of an existing SHC QR Code from the phone's photo library or file service
3. Adding a SHC from the Health Gateway mobile website

Once added to the wallet, vaccine cards can be selected to display their SHC QR Codes, ready for scanning by a verifier. (Note that in British Columbia, anyone wanting to scan a BC Vaccine Card's QR Code must use the official [BC Vaccine Card Verifier app](https://apps.apple.com/ca/app/bc-vaccine-card-verifier/id1583114791).) Multiple cards can be added, to support situations such as holding cards for the whole family for ease of presentation.

In the future, BC Wallet may be expanded to incorporate support for Verifiable Credentials, as seen in Technology Layers 2 and 3 of the [Trust Over IP Model](https://trustoverip.org/toip-model/).

BC Wallet is built using [React Native](https://reactnative.dev), an open-source UI software framework created by Facebook, and [TypeScript](https://www.typescriptlang.org), a typed ECMAScript variant from Microsoft. This technical stack allows development for both iOS and Android while maintaining possible future compatibility with [Aries Bifold](https://github.com/hyperledger/aries-mobile-agent-react-native).

## Credit

BC Wallet is developed and maintained by the Government of British Columbia’s Digital Trust Team in Canada.

## Contributing

We welcome issues submitted about technical or User Experience problems you encounter in using BC Wallet. See the [Contributing](https://github.com/bcgov/bc-wallet-mobile/blob/main/CONTRIBUTING.md) file for more details.

## License

[Apache License Version 2.0](https://github.com/bcgov/bc-wallet-mobile/blob/main/LICENSE)

## Supporters
[![Testing Powered By SauceLabs](https://opensource.saucelabs.com/images/opensauce/powered-by-saucelabs-badge-gray.png?sanitize=true "Testing Powered By SauceLabs")](https://saucelabs.com)
