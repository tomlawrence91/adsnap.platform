import AuthService from "./AuthService";
import * as URLS from "../constants/urls";
import RNFetchBlob from 'react-native-fetch-blob'
import vision from "react-cloud-vision-api";

export default class AjaxService {
  static serialize(obj, prefix) {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push(
          typeof v == "object"
            ? AjaxService.serialize(v, k)
            : encodeURIComponent(k) + "=" + encodeURIComponent(v)
        );
      }
    }
    return str.join("&");
  }

  static async get(url, data = {}) {
    var str = Object.keys(data).length > 0
      ? "?" + AjaxService.serialize(data)
      : "";
    const token = await AuthService.getToken();
    console.log(token);
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url + str, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        reject(json);
        return;
      }
      resolve(json);
    });
  }

  static async post(url, data = {}) {
    return new Promise(async (resolve, reject) => {
      console.log("token", await AuthService.getToken());
      const token = await AuthService.getToken();
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        const json = await response.json();
        if (!response.ok) {
          reject(json);
          return;
        }
        resolve(json);
      } catch (err) {
        console.error(err);
      }
    });
  }

  static async put(url, data = {}, headers = {}) {
    const token = await AuthService.getToken();
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          ...headers,
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      if (!response.ok) {
        reject(json);
        return;
      }
      resolve(json);
    });
  }

  static async uploadImage2(formData) {
    const photo = {
      path: fd["path"],
      type: "image/jpeg",
      name: "photo.jpg"
    };

    let body = new FormData();
    body.append("file", photo);
    body.append("title", "Snap");

    let headers = new Headers();
    headers.append("Accept", "application/json");

    return fetch(URLS.uploadImage, {
      method: "PUT",
      body: body,
      headers: headers.then(res => handleErrors(res))
    });
  }

  static async signup(user) {
    return await AjaxService.post(URLS.signupUrl(), user);
  }

  static async getUser() {
    return await AjaxService.get(URLS.getUserUrl());
  }

  // static async uploadSnap(snap) {
  //   return await AjaxService.post(URLS.uploadSnapUrl(), snap);
  // }

  static async uploadSnap(snap) {

    let data = await RNFetchBlob.fs.readFile(file.path, 'base64');

    vision.init({ auth: 'AIzaSyALgcuT2frN1R6nTr3f9_2UB9c3A7lnAuU'});

    const req = new vision.Request({
      image: new vision.Image({
        base64: data,
      }),
      features: [
        new vision.Feature('TEXT_DETECTION', 4),
        new vision.Feature('LABEL_DETECTION', 10),
        new vision.Feature('LOGO_DETECTION', 10),
      ]
    });

    let result = await vision.annotate(req);

    // handling response
    console.log(res.responses)

  }

}
