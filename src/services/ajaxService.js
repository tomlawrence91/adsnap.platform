import AuthService from './AuthService';
import * as URLS from '../constants/urls';

export default class AjaxService {

  static serialize(obj, prefix) {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push(typeof v == "object" ?
          AjaxService.serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

  static async get(url, data = {}) {
    var str = Object.keys(data).length > 0 ? ('?' + AjaxService.serialize(data)) : '';
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url + str, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${AuthService.getToken()}`
        }
      })
      const json = await response.json();
      if (!response.ok) {
        reject(json);
        return;
      }
      resolve(json);
    });
  }

  static async post(url, data = {}) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${AuthService.getToken()}`
        }
      })
      const json = await response.json()
      if (!response.ok) {
        reject(json)
        return
      }
      resolve(json)
    })
  }

  static async put(url, data = {}, headers = {}) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${AuthService.getToken()}`
        }
      })
      const json = await response.json()
      if (!response.ok) {
        reject(json)
        return
      }
      resolve(json)
    })
  }

  static async uploadImage2(formData) {
    const photo = {
      path: fd['path'],
      type: 'image/jpeg',
      name: 'photo.jpg',
    }

    let body = new FormData();
    body.append('file', photo);
    body.append('title', 'Snap');

    let headers = new Headers();
    headers.append('Accept', 'application/json');

    return fetch(URLS.uploadImage, {
      method: 'PUT',
      body: body,
      headers: headers
        .then((res) => handleErrors(res))
    });
  }
}