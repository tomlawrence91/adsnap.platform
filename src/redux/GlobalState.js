import {Map} from 'immutable';


// Initial state
const initialState = Map({
  error: false,
  loading: false,
  ready: false,
});

//actions
const SET_ERROR = 'GlobalState/SET_ERROR';
const SET_LOADING = 'GlobalState/SET_LOADING';
const IS_READY = 'GlobalState/IS_READY';

//action creators
export function setError(error){
  return{
    type: SET_ERROR,
    payload: error,
  }
}
export function isReady(){
  return {
    type: IS_READY
  }
}



// Reducer
export default function GlobalStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case IS_READY:
      return state.set('ready', true);

    case SET_ERROR:
      return state.set('error', action.payload);

    default:
      return state;
  }
}
