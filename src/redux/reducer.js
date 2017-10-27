import { Map } from "immutable";
import GlobalStateReducer from "./GlobalState";
import { combineReducers } from "redux-immutable";
import WelcomeViewStateReducer from "../modules/welcome/WelcomeState";
import ChallengesState from '../modules/challenges/ChallengesState'
import ChallengeDetailsState from '../modules/challengeDetails/ChallengeDetailsState'
import DealsViewStateReducer from "../modules/deals/DealsState";
import SnapStateReducer from "../modules/snap/SnapState";
import RedeemStateReducer from "../modules/redeem/RedeemState";
import SettingsStateReducer from "../modules/settings/SettingsState";
import ImageBrowserReducer from "../modules/imageBrowser/ImageBrowserState";

const reducers = {
  welcome: WelcomeViewStateReducer,
  challenges: ChallengesState,
  challengeDetails: ChallengeDetailsState,
  deals: DealsViewStateReducer,
  snap: SnapStateReducer,
  redeem: RedeemStateReducer,
  settings: SettingsStateReducer,
  imageBrowser: ImageBrowserReducer
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map;
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  if (action.type === "RESET_STATE") {
    return namespacedReducer(action.payload, action);
  }
  return namespacedReducer(state || void 0, action);
}
