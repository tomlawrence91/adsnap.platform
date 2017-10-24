import { fromJS, toJS } from "immutable";
import AjaxService from "../../services/AjaxService";
import store from "../../redux/store";
import * as STORAGE from "../../constants/storageNames";
import { AsyncStorage } from "react-native";
import AuthService from "../../services/AuthService";

const lodash = require("lodash");

// Initial state
const initialState = fromJS({
  accessToken: null,
  idToken: null
});

//actions
const SET_USER_TOKEN = "WELCOME/SET_USER_TOKEN";

//Thunks
// export function login(email, password, successCallback, errorCallback) {
//   console.log("email", email);
//   console.log("password", password);
//   return async (dispatch, getState) => {
//     const response = await AuthService.login(email, password);

//     if (response.error) {
//       errorCallback();
//       return;
//     }

//     dispatch(setUserToken(response));
//     successCallback();
//   };
// }

export function signup(user, successCallback, errorCallback) {
  return async (dispatch, getState) => {
    try {
      console.log("user", user);
      const authResponse = await AuthService.signup(user.email, user.password);
      console.log(authResponse);
      if (authResponse.error) {
        errorCallback();
        return;
      }
      console.log(user.email, user.password);
      const singeupResponse = await AuthService.login(
        user.email,
        user.password
      );
      if (singeupResponse.error) {
        errorCallback();
        return;
      }
      const persistableUser = lodash.omit(user, "password");
      console.log("about to persist user");
      const response = await AjaxService.signup(persistableUser);
      console.log(response);

      if (response.error) {
        errorCallback();
        return;
      }
    } catch (error) {
      console.error(error);
    }

    successCallback();
  };
}

//action creators
export function setUserToken(jwtToken) {
  return {
    type: SET_USER_TOKEN,
    payload: jwtToken
  };
}

// Reducer
export default function WelcomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER_TOKEN:
      return state;

    default:
      return state;
  }
}
