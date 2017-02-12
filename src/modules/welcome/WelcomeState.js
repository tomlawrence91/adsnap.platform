import { fromJS } from 'immutable';
import * as ajaxService from '../../services/ajaxService';


// Initial state
const initialState = fromJS({
  error: false,
  loading: false,
  ready: false,
});

export function login(email, password, successCallback, errorCallback) {
  console.log("email", email)
  console.log("password", password)
  return (dispatch, getState) => {
    ajaxService.auth0login(email, password)
      .then(response => {

        console.log(response)
        if (response.error) {
          console.log(response.error)
          errorCallback();
          return;
        }
        successCallback();
      })

  }
}

export function signup(user, callback) {
  return (dispatch, getState) => {
    //TODO: register user in backend
    ajaxService.auth0signup(user.email, user.password).then(
      response => {
        console.log(response)
        if (response.error) {
          callback(response.error, null)
        }
        callback(null, response)
      });
  }
}
//actions

//action creators

// Reducer
export default function WelcomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
