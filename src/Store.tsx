import React, {createContext, useReducer, useMemo} from 'react';
import Reducer from './Reducer';
import {State} from './types';
import {CredentialHelper} from './utils/credhelper';

const initialState: State = {
  credentials: [],
  error: null,
};

const Store = ({children}: {children: any}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useMemo(() => {
    async function wrap() {
      try {
        const results = await CredentialHelper.credentials();
        initialState.credentials = results;
        console.debug(`Found ${results.length} credentials`);
      } catch (err) {
        const msg = 'Unable to fetch credentials';
        console.error(msg);
      }
    }
    wrap();
  }, []);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
