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
    case DispatchAction.AddCredential: {
      const item = action.payload.pop();

      if (CredentialHelper.credentialExists(item, state.credentials)) {
        return state;
      }

      const newstate = {
        ...state,
        credentials: state.credentials.concat([item]),
      };

      Promise.resolve(CredentialHelper.save(newstate.credentials));

      return newstate;
    }
    case DispatchAction.RemoveCredential: {
      const item = action.payload.pop();
      const newstate = {
        ...state,
        credentials: state.credentials.filter(
          credential => credential.id !== item.id,
        ),
      };

      Promise.resolve(CredentialHelper.save(newstate.credentials));
      return newstate;
    }
    case DispatchAction.SetError:
      return {
        ...state,
        error: {...action.payload.pop()},
      };
    default:
      return state;
  }
};

export default Reducer;
