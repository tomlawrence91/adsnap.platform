import { fromJS, toJS } from 'immutable';
import AjaxService from '../../services/AjaxService';
import store from '../../redux/store';
import * as STORAGE from '../../constants/storageNames';
import { AsyncStorage } from 'react-native';
import AuthService from '../../services/AuthService';


// Initial state
const initialState = fromJS({
  accessToken: null,
  idToken: null,
});

//actions
const SET_USER_TOKEN = "WELCOME/SET_USER_TOKEN";

//Thunks
export function login(email, password, successCallback, errorCallback) {

  return async (dispatch, getState) => {
    const response = await AuthService.login(email, password);

    if (response.error) {
      errorCallback();
      return;
    }

    dispatch(setUserToken(response));
    successCallback();
  }
}

export function signup(user, successCallback, errorCallback) {
  return async (dispatch, getState) => {
    const authResponse = await AuthService.signup(email, password);
    console.log(authResponse);
    const response = await AjaxService.signup(email, password);

    if (response.error) {
      errorCallback();
      return;
    }

    dispatch(setUserToken(response));
    successCallback();
  }
}

//action creators
export function setUserToken(jwtToken) {
  return {
    type: SET_USER_TOKEN,
    payload: jwtToken,
  }
}

// Reducer
export default function WelcomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case (SET_USER_TOKEN):
      console.log(action.payload);
      return state.set('accessToken', fromJS(action.payload.access_token));
      return state.set('idToken', fromJS(action.payload.id_token));

    default:
      return state;
  }
}
