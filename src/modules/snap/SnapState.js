import { fromJS } from "immutable";
import {map} from 'lodash';
import VisionService from "../../services/VisionService";
import { saveToSpreadsheet } from '../../services/SpreadsheetService'
// import * as DealsState from "../deals/DealsState";
// import { Alert } from "react-native";

import { brandTerms, adTerms } from '../../constants/terms.js'

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
    type: '',
    reward: {},
    labels: [],
    texts: [],
    logos: [],
    brand: ''
  },
  points: 100,
  brandTerms: brandTerms
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

      let labelAnnotations = action.payload.results[0].labelAnnotations || [];
      let textAnnotations = action.payload.results[0].textAnnotations || [];
      let logoAnnotations = action.payload.results[0].logoAnnotations || [];
      const annotations = [labelAnnotations, textAnnotations, logoAnnotations];
      let [ labels, texts, logos ] = map(annotations, type => type && map(type, annotation => typeof annotation.description === 'string' && annotation.description.toLowerCase() ));

      texts && texts.forEach(text => {
        const splitText = text.split('\n');
        if (splitText.length > 1) {
          splitText.forEach(fragment => texts.push(fragment));
        }
        texts.push(splitText.join(' ').trim());
      });

      results.file = action.payload.file;
      results.terms = labels.concat(texts, logos);

      // match against keywords of current challenge, or generic terms
      const matchAgainst = state.get('currentChallenge').toJS();

      results.type = 'ad';
      results.termsMatching = adTerms;

      if (matchAgainst.keywords) {
        results.termsMatching = matchAgainst.keywords;
        results.type = 'challenge';
      }

      results.termsMatching.forEach(term => {
        if (results.terms.includes(term.toLowerCase())) {
          results.match = true;
        }
      });


      if (results.type === 'ad' && (results.match || logos.length)) {

        // match against brands
        let matchBrand = false;

        const brandTerms = state.get('brandTerms').toJS();

        for (let brandName in brandTerms) {
          if (!brandTerms.hasOwnProperty(brandName)) {
            return;
          }

          // match each term in terms array against brand terms
          brandTerms[brandName].forEach(brandTerm => {

            if (logos.length) {
              logos.forEach(logo => {
                let regex = new RegExp('^' + brandTerm.toLowerCase() + '$', 'gi');

                if (logo && logo.match(regex)) {
                  matchBrand = true;
                  results.match = true;
                  results.type = 'deal';
                  results.brand = brandName;
                }
              });
            }

            if ( ! matchBrand ) {
              results.terms.forEach(term => {
                let regex = new RegExp('^' + brandTerm.toLowerCase() + '$', 'gi');
                if (term && term.match(regex)) {
                  matchBrand = true;
                  results.match = true;
                  results.type = 'deal';
                  results.brand = brandName;
                }
              });
            }

          })
        }
      }

      saveToSpreadsheet(results.match, results.brand, results.termsMatching, annotations)
      return state.set("results", fromJS(results));

    case SET_REWARD:
      results = state.get("results").toJS();
      results.reward = action.payload;
      results.brand = '';
      return state.set("results", fromJS(results));

    case SET_UPLOADING_FLAG:
      return state.set("uploading", fromJS(action.payload));

    case UPDATE_POINTS:
      return state.set("points", fromJS(action.payload));

    default:
      return state;
  }
}
