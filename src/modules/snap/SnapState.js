import { fromJS } from "immutable";
import {map} from 'lodash';
// import AjaxService from "../../services/AjaxService";
import VisionService from "../../services/VisionService";
import { saveToSpreadsheet } from '../../services/SpreadsheetService'
// import * as DealsState from "../deals/DealsState";
// import { Alert } from "react-native";

const SET_UPLOADING_FLAG = "SNAP/SET_UPLOADING_FLAG";

const SET_CURRENT_CHALLENGE = "SNAP/SET_CURRENT_CHALLENGE";

const SHOW_RESULTS = "SNAP/SHOW_RESULTS";
const HIDE_RESULTS = "SNAP/HIDE_RESULTS";

const SET_REWARD = "SNAP/SET_REWARD";

const UPDATE_POINTS = "SNAP/UPDATE_POINTS";

// Initial state
const initialState = fromJS({
  uploading: false,
  currentChallenge: {},
  results: {
    ready: false,
    match: false,
    reward: {},
    labels: [],
    texts: [],
    logos: []
  },
  points: 100
});

export function uploadSnap(file) {

  return async (dispatch, getState) => {

    dispatch(setUploadingFlag(true));

    VisionService.annotate(file, (res) => {
      dispatch(showResults(res.responses, file));
      dispatch(setUploadingFlag(false));
    })

  };
}

export function setUploadingFlag(uploadingFlag) {
  return {
    type: SET_UPLOADING_FLAG,
    payload: uploadingFlag
  };
}

export function showResults(results, file) {
  return {
    type: SHOW_RESULTS,
    payload: {
      results: results,
      file: file
    }
  };
}
export function hideResults() {
  return {
    type: HIDE_RESULTS,
    payload: {}
  };
}

export function setCurrentChallenge(challenge) {
  return {
    type: SET_CURRENT_CHALLENGE,
    payload: challenge
  }
}

export function setReward(reward) {
  return {
    type: SET_REWARD,
    payload: reward
  }
}

export function updatePoints(amount) {
  return {
    type: UPDATE_POINTS,
    payload: amount
  }
}

// Reducer
export default function SnapStateReducer(state = initialState, action = {}) {

  let results = {};

  switch (action.type) {
    case SET_CURRENT_CHALLENGE:
      return state.set("currentChallenge", fromJS(action.payload));

    case HIDE_RESULTS:
      results = state.get("results").toJS();
      results.ready = false;
      return state.set("results", fromJS(results));

    case SHOW_RESULTS:

      // check if result is positive or negative
      results = state.get("results").toJS();
      results.ready = true;

      // negative
      results.match = false;

      let annotations = { labelAnnotations, textAnnotations, logoAnnotations } = action.payload.results[0];
      let [ labels, texts, logos ] = map(annotations, type => type && map(type, annotation => annotation.description));

      results.file = action.payload.file;

      // positive
      results.terms = labels.concat(texts, logos);

      const matchAgainst = state.get('currentChallenge').toJS();

      results.type = 'ad';
      results.termsMatching = ['advertisement', 'billboard', 'logo', 'product'];

      if (matchAgainst.keywords) {
        results.termsMatching = matchAgainst.keywords;
        results.type = 'challenge';
      }

      results.termsMatching.forEach( term => {
        if (results.terms.includes(term)) {
          results.match = true;
        }
      });

      saveToSpreadsheet(results.match, annotations)

      return state.set("results", fromJS(results));

    case SET_REWARD:
      console.log(action.payload);
      results = state.get("results").toJS();
      results.reward = action.payload;
      return state.set("results", fromJS(results));

    case SET_UPLOADING_FLAG:
      return state.set("uploading", fromJS(action.payload));

    case UPDATE_POINTS:
      return state.set("points", fromJS(action.payload));

    default:
      return state;
  }
}
