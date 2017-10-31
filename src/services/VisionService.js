// import AuthService from "./AuthService";
// import * as URLS from "../constants/urls";
import RNFetchBlob from 'react-native-fetch-blob'
import vision from "react-cloud-vision-api";

export default class AjaxService {

  static async annotate(file, cb) {

    RNFetchBlob.fs.readFile(file, 'base64')
      .then((data) => {

        vision.init({auth: 'AIzaSyBrZSU7C0EraGd8cnGyIfs3_eLBT0mnywY'});

        const req = new vision.Request({
          image: new vision.Image({
            base64: data
          }),
          features: [
            new vision.Feature('TEXT_DETECTION', 10),
            new vision.Feature('LABEL_DETECTION', 10),
            new vision.Feature('LOGO_DETECTION', 10),
          ]
        });

        vision.annotate(req).then(cb, (e) => {
          console.log('Error: ', e);
        });

      });

  }

}
