import React, {createContext} from 'react';
import translations from './translations';
import {defaultLanguage} from './constants';
import * as RNLocalize from 'react-native-localize';

export const LocalizationContext = createContext({
  translations,
});

export const LocalizationProvider = ({children}: {children: any}) => {
  const availableLanguages = translations.getAvailableLanguages();
  const bestLanguageMatch =
    RNLocalize.findBestAvailableLanguage(availableLanguages);
  let translationToUse = defaultLanguage;

  if (
    bestLanguageMatch &&
    availableLanguages.includes(bestLanguageMatch.languageTag)
  ) {
    translationToUse = bestLanguageMatch.languageTag;
  }

  console.log(`Using translation "${translationToUse}"`);
  translations.setLanguage(translationToUse);

  return (
    <LocalizationContext.Provider value={{translations}}>
      {children}
    </LocalizationContext.Provider>
  );
};
