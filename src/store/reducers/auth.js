import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  token: null,
  refreshToken: null,
  userId: null,
  error: null,
  loading: false
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {...state, loading: true};
    case actionTypes.AUTH_SUCCESS:
      return {...state, loading: false,
        token: action.authData.idToken,
        refreshToken: action.authData.refreshToken,
        userId: action.authData.localId
      }
    case actionTypes.AUTH_FAIL:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
}

export default reducer;
