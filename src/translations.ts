import LocalizedStrings from 'localized-strings';

const strings = {
  en: {
    AppFullName: 'BC Wallet',
    Welcome: 'Welcome to your wallet!',
    GetStarted: 'Get started',
    AddFirst: 'Add your first Vaccine Card',
    AddVaccineCard: 'Add a Vaccine Card',
    WalkthroughOne: 'Keep your BC Vaccine Cards on your smartphone',
    WalkthroughTwo: 'Update it from a QR Code or from Health Gateway',
    WalkthroughThree:
      'Add multiple Vaccine Cards and quickly swipe through them',
    WalkthroughFour:
      'In the future, keep other credentials securely in your wallet',
    UploadQR: 'Upload a QR Code',
    ScanQR: 'Scan a QR Code',
    AddFromHeathGateway: 'Get from Health Gateway',
    CredentialDetails: {
      Name: 'Name',
      DoB: 'Date of Birth',
      Immunization: 'Immunization',
      Dose: 'Dose',
      Product: 'Product',
      Date: 'Date',
      Lot: 'Lot Number',
      Provider: 'Provider or Clinic',
      PrivacyMessage: 'You do not need to share this information with anyone',
    },
    Navigation: {
      CardsTitle: 'Cards',
      CredentialAddTitle: 'Add Vaccine Card',
      CredentialDetailTitle: 'Vaccine Details',
      ScannerTitle: 'Scan a QR Code',
    },
    Android: {
      UseCameraTitle: 'Permission to use camera',
      UseCameraMessage: 'We need your permission to use your camera',
    },
    Alerts: {
      ScannerFail: {
        title: 'Yikes!',
        message: 'There was a problem decoding this QR code.',
      },
      DecodeQRFail: {
        title: 'Yikes!',
        message: "We couldn't find a QR code.",
      },
      AddFromLibrary: {
        title: 'Yikes!',
        message: 'There was a problem decoding this QR code.',
      },
      OpenHealthGateway: {
        title: 'Yikes!',
        message: 'There was a problem opening the Health Gateway.',
      },
    },
  },
};

export default new LocalizedStrings(strings);
