import { fromJS } from 'immutable';
import * as ajaxService from '../../services/ajaxService';


// Initial state
const initialState = fromJS({
  error: false,
  loading: false,
  ready: false,
});

export function login(email, password) {
  return (dispatch, getState) => {
    ajaxService.auth0login(email, password)
      .then(response => {

        console.log(response)
        if (response.error) {
          console.log("failure")
          console.log(response.error)
          //TODO: error popup
          return false;
          
        }
        return true;
      })

  }
}

export function signup(email, password) {
  return (dispatch, getState) => {
    //TODO: register user in backend
    ajaxService.auth0signup(email, password).then(response => console.log(response))
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
