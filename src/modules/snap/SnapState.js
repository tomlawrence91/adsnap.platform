import { fromJS } from "immutable";
import AjaxService from "../../services/AjaxService";
import * as DealsState from "../deals/DealsState";
import { Alert } from "react-native";
import RNFetchBlob, {wrap} from 'react-native-fetch-blob'
import vision from 'react-cloud-vision-api';

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
    labels: [],
    texts: [],
    logos: []
  }
});

const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      () => {
        Alert.alert("LABEL_NO_LOCATION_IOS ");
        reject();
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });
};

export function uploadSnap(file) {
  console.log("uploadSnap");

  return async (dispatch, getState) => {

    dispatch(setUploadingFlag(true));

    RNFetchBlob.fs.readFile(file, 'base64')
      .then((data) => {

        vision.init({auth: 'AIzaSyALgcuT2frN1R6nTr3f9_2UB9c3A7lnAuU'});

        const req = new vision.Request({
          image: new vision.Image({
            base64: data
          }),
          features: [
            new vision.Feature('TEXT_DETECTION', 3),
            new vision.Feature('LABEL_DETECTION', 3),
            new vision.Feature('LOGO_DETECTION', 3),
          ]
        });

        vision.annotate(req).then((res) => {
          // handling response
          // console.log(JSON.stringify(res.responses));
          dispatch(showResults(res.responses));
          dispatch(setUploadingFlag(false));
        }, (e) => {
          console.log('Error: ', e)
        })

      });


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

export function showResults(results) {
  console.log(results, results);
  return {
    type: SHOW_RESULTS,
    payload: {
      results: results
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
      results.labels = [];
      results.texts = [];
      results.logos = [];
      results.ready = false;
      return state.set("results", fromJS(results));
    case SHOW_RESULTS:
      console.log(action.payload);
      results = state.get("results").toJS();
      results.ready = true;
      results.labels = action.payload.results[0].labelAnnotations.map(a => a.description);
      results.texts = action.payload.results[0].textAnnotations.map(a => a.description);
      results.logos = action.payload.results[0].logoAnnotation && action.payload.results[0].logoAnnotation.map(a => a.description);
      console.log(results);
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
