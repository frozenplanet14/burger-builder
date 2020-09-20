import * as actionTypes from './actionsTypes';
import axios from 'axios';


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const authenticate = (email, password, isSignIn) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${isSignIn ? 'signInWithPassword' : 'signUp'}?key=AIzaSyBVLsHEE-UucLUXQ0tjQTD4hqPXJ9_jBco`, {
      email, password, returnSecureToken: true
    })
    .then(({data}) => dispatch(authSuccess(data)))
    .catch((err) => dispatch(authFail(err.response.data.error)))
  }
}
