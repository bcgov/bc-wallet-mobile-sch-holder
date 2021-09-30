import React, {createContext, Dispatch, useReducer} from 'react';
import reducer, {ReducerAction} from './Reducer';
import {State} from './types';

const initialState: State = {
  credentials: [],
  error: null,
};

const Store: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext<[State, Dispatch<ReducerAction>]>([
  initialState,
  () => {
    return;
  },
]);
export default Store;
