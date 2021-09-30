
export enum DispatchAction {
  SetCredentials = 'SET_CREDENTIALS',
  AddCredential = 'ADD_CREDENTIAL',
  RemoveCredential = 'REMOVE_CREDENTIAL',
  SetError = 'SET_ERROR',
}

const Reducer = (state, action) => {
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
          credential => credential.id !== action.payload,
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
