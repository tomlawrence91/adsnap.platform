import { Map } from 'immutable';


// Initial state
const initialState = Map({
  error: false,
  loading: false,
  ready: false,
});

//actions
const SET_ERROR = 'GlobalState/SET_ERROR';

//action creators
export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error,
  }
}

// Reducer
export default function GlobalStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case SET_ERROR:
      return state.set('error', action.payload);

    default:
      return state;
  }
}
