import { fromJS, toJS } from 'immutable';
import * as ajaxService from '../../services/ajaxService';
import {setItem} from '../../services/storageService';
import store from '../../redux/store';
import * as STORAGE from '../../constants/storageNames';
import { AsyncStorage } from 'react-native';


// Initial state
const initialState = fromJS({
  accessToken: '',
});

//actions
const SET_USER_TOKEN = "WELCOME/SET_USER_TOKEN";

//Thunks
export function login(email, password, successCallback, errorCallback) {
  console.log("email", email)
  console.log("password", password)
  return async (dispatch, getState) => {
    response = await ajaxService.auth0login(email, password)

    if (response.error) {
      console.error(response.error)
      errorCallback();
      return;
    }
    console.log(response);
    dispatch(setUserToken(response));
    successCallback();
  }
}

export function signup(user, successCallback, errorCallback) {
  return (dispatch, getState) => {
    //TODO: register user in backend
    ajaxService.auth0signup(user.email, user.password).then(
      response => {
        console.log(response)
        if (response.error) {
          errorCallback(response.error)
        }
        successCallback()
      });
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
    case(SET_USER_TOKEN):
      const accessToken = action.payload.access_token;
      setItem(STORAGE.ACCESS_TOKEN,accessToken);
      return state.set('accessToken', fromJS(accessToken));

    default:
      return state;
  }
}
