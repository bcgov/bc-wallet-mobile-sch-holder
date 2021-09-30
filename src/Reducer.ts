import {State} from './types';
import {CredentialHelper} from './utils/credhelper';

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

const Reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case DispatchAction.SetCredentials:
      return {
        ...state,
        credentials: action.payload,
      };
    case DispatchAction.AddCredential:
      const xState = {
        ...state,
        credentials: state.credentials.concat(action.payload),
      };

      Promise.resolve(CredentialHelper.save(xState.credentials));
      return xState;
    case DispatchAction.RemoveCredential:
      const item = action.payload.pop();
      const zState = {
        ...state,
        credentials: state.credentials.filter(
          credential => credential.id !== item.id,
        ),
      };

      Promise.resolve(CredentialHelper.save(zState.credentials));
      return zState;
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
