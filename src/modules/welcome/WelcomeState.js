import {fromJS} from 'immutable';
import * as ajaxService from '../../services/ajaxService';


// Initial state
const initialState = fromJS({
  error: false,
  loading: false,
  ready: false,
});

//actions

//action creators
export function test(){
    return (dispatch, getState) =>{
        console.log(getState().toJS())
        
        
    }
}

// Reducer
export default function WelcomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
