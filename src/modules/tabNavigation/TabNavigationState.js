import {fromJS} from 'immutable';
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
