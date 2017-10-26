import { fromJS } from "immutable";
import {map} from 'lodash';
// import AjaxService from "../../services/AjaxService";
import VisionService from "../../services/VisionService";
// import * as DealsState from "../deals/DealsState";
// import { Alert } from "react-native";

const SET_UPLOADING_FLAG = "SNAP/SET_UPLOADING_FLAG";
const UPDATE_ANIMATION = "SNAP/UPDATE_ANIMATION";
const SHOW_RESULTS = "SNAP/SHOW_RESULTS";
const HIDE_RESULTS = "SNAP/HIDE_RESULTS";

// Initial state
const initialState = fromJS({
  uploading: false,
  animationObj: {
    stage: 0,
    current: "<(°.°)>",
    values: ["<(°.°<)", "<(°.°)>", "(>°.°)>", "<(°.°)>"]
  },
  results: {
    ready: false,
    match: false,
    labels: [],
    texts: [],
    logos: []
  }
});

// const getGeolocation = () => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//         });
//       },
//       () => {
//         Alert.alert("LABEL_NO_LOCATION_IOS ");
//         reject();
//       },
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   });
// };

export function uploadSnap(file) {

  return async (dispatch, getState) => {

    dispatch(setUploadingFlag(true));

    VisionService.annotate(file, (res) => {
      dispatch(showResults(res.responses, file));
      dispatch(setUploadingFlag(false));
    })

    // const geolocation = await getGeolocation();
    // AjaxService.uploadImage(file).then(response => response.json()).then(response => {
    //     console.log(response.data.fileName);
    //     let fileLocation = ajaxService.baseUrl + response.data.fileName;
    //     dispatch(setUploadingFlag(false))
    // })
    // const snap = {
    //   imageUrl: "http://localhost/test.png",
    //   geojson: [geolocation.longitude, geolocation.latitude]
    // };

    // send http request in a new thread (using native code)

    // console.log(file);

    // const deal = await AjaxService.uploadSnap(snap);
    // dispatch(setUploadingFlag(false));

    // TODO: detirmine if deal was found.
    // TODO: dispatch new deal or inform the user
    // await setTimeout(() => dispatch(setUploadingFlag(false)), 10000);
    // {
    //         logoUrl: "http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409",
    //         campaignUrl: "http://vignette3.wikia.nocookie.net/mrrobot/images/8/87/ECorp.png/revision/latest?cb=20150602024409",
    //         id: "8",
    //         amount: "15%",
    //         description: "on your product",
    //         brandName: "this could be you",
    //         code: "Td34dJ"
    //       }
    // dispatch(DealsState.addDeal(deal));
  };
}

export function setUploadingFlag(uploadingFlag) {
  return {
    type: SET_UPLOADING_FLAG,
    payload: uploadingFlag
  };
}

export function updateAnimation() {
  return {
    type: UPDATE_ANIMATION,
    payload: {}
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

// Reducer
export default function SnapStateReducer(state = initialState, action = {}) {

  let results = {};

  switch (action.type) {

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
      results.termsMatching = ['adidas', 'sports', 'black and white', 'adidas originals'];

      results.termsMatching.forEach( term => {
        if (results.terms.includes(term)) {
          results.match = true;
        }
      });

      return state.set("results", fromJS(results));

    case SET_UPLOADING_FLAG:
      return state.set("uploading", fromJS(action.payload));
    case UPDATE_ANIMATION:
      let newAnimationObj = state.get("animationObj").toJS();
      newAnimationObj.stage = newAnimationObj.stage <= 3
        ? newAnimationObj.stage + 1
        : 0;
      console.log("stage", newAnimationObj.stage);
      newAnimationObj.current = newAnimationObj.values[newAnimationObj.stage];
      return state.set("animationObj", fromJS(newAnimationObj));
    default:
      return state;
  }
}
