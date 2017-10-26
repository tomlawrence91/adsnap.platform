import { isTokenExpired } from "../utils/jwtUtils";
import {
  storeItem,
  getStoredItem,
  deleteStoredItem
} from "../utils/storageUtils";
import * as STORAGE from "../constants/storageNames";
import AjaxService from "./AjaxService";
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'adsnap-app.eu.auth0.com',
  clientId: 'EFiUiAIIvyQ7DtInLammnPrP3SLc87QD'
});

export default class AuthService {
  static login(email, password) {
    return new Promise((resolve, reject) => {
      auth0
        .auth
        .passwordRealm({
          username: email,
          password: password,
          realm: 'Username-Password-Authentication'
        })
        .then(credentials => {
          console.log(credentials)
          AuthService.setToken(credentials.accessToken, credentials.idToken)

          auth0
            .auth
            .userInfo({
              token: credentials.accessToken
            })
            .then(userInfo => {
              console.log(userInfo)
              AuthService.setUser(JSON.stringify(userInfo))
              resolve(userInfo)
            })
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
  }

  static signup(email, password) {
    return new Promise((resolve, reject) => {
      auth0
        .auth
        .createUser({
          email: email,
          password: password,
          connection: 'Username-Password-Authentication'
        })
        .then(credentials => {
          AuthService.setUser(JSON.stringify(credentials))          
          resolve()
        })
        .catch(err => reject(err))
    })
  }

  static isLoggedIn() {
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  static setToken(accessToken, idToken) {
    storeItem(STORAGE.ACCESS_TOKEN, accessToken);
    storeItem(STORAGE.ID_TOKEN, idToken);
  }

  static setUser(user) {
    storeItem(STORAGE.USER, user)
  }

  static getToken() {
    return getStoredItem(STORAGE.ID_TOKEN);
  }

  static logout() {
    deleteStoredItem(STORAGE.ACCESS_TOKEN);
    deleteStoredItem(STORAGE.ID_TOKEN);
    deleteStoredItem(STORAGE.USER);
  }
}
