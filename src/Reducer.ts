import {State} from './types';

export enum DispatchAction {
  SetCredentials = 'SET_CREDENTIALS',
  AddCredential = 'ADD_CREDENTIAL',
  RemoveCredential = 'REMOVE_CREDENTIAL',
  SetError = 'SET_ERROR',
}

export interface ReducerAction {
  payload: Array<any>;
  type: DispatchAction;
}

const Reducer = (state: State, action: ReducerAction) => {
  // console.log(`Reducer action = ${action}, sate = ${JSON.stringify(state)}`);
  switch (action.type) {
    case DispatchAction.SetCredentials:
      return {
        ...state,
        credentials: action.payload,
      };
    case DispatchAction.AddCredential:
      return {
        ...state,
        credentials: state.credentials.concat(action.payload),
      };
    case DispatchAction.RemoveCredential:
      return {
        ...state,
        credentials: state.credentials.filter(
          credential => credential.id !== action.payload.pop(),
        ),
      };
    case DispatchAction.SetError:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
