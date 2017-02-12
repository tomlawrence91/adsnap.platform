import { Map } from 'immutable';
import GlobalStateReducer from './GlobalState';
import { combineReducers } from 'redux-immutable';
import WelcomeViewStateReducer from '../modules/welcome/WelcomeState';
import DealsViewStateReducer from '../modules/deals/DealsState';
import SnapStateReducer from '../modules/snap/SnapState';
import SignInStateReducer from '../modules/signin/SignInState';
import SignUpStateReducer from '../modules/signup/SignUpState';

const reducers = {
  welcome: WelcomeViewStateReducer,
  deals: DealsViewStateReducer,
  snap: SnapStateReducer,
  signin: SignInStateReducer,
  signup: SignUpStateReducer,
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  if (action.type === 'RESET_STATE') {
    return namespacedReducer(action.payload, action);
  }
  return namespacedReducer(state || void 0, action);
}
