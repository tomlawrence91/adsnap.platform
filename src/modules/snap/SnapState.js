import {Map} from 'immutable';
import * as ajaxService from '../../services/ajaxService';



// Initial state
const initialState = Map({
});

// Reducer
export default function SnapStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    default:
      return state;
  }
}
