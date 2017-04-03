import {fromJS} from 'immutable';
import AjaxService from '../../services/AjaxService';
import * as ROUTES from '../../constants/routes';


// Initial state
const initialState = fromJS({
});

// Reducer
export default function TabNavigationStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
