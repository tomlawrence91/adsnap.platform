import {Map} from 'immutable';
import * as ajaxService from '../../services/ajaxService';
import * as ROUTES from '../../constants/routes';
import * as NavigationState from '../navigation/NavigationState';


// Initial state
const initialState = Map({
});

// Reducer
export default function SearchStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    default:
      return state;
  }
}
