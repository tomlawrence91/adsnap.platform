import { isTokenExpired } from "../utils/jwtUtils";
import {
  storeItem,
  getStoredItem,
  deleteStoredItem
} from "../utils/storageUtils";
import * as STORAGE from "../constants/storageNames";
import AjaxService from "./AjaxService";

export default class AuthService {
  /**
     * Logsin the user in Auth0, stores the token and retruns the auth0 user object.
     * @param {*} email
     * @param {*} password
     */
  static async login(profile, id_token) {
    return new Promise(async (resolve, reject) => {
      try {
        await storeItem(STORAGE.ID_TOKEN, id_token);

        if (!profile.identities.filter(identity => identity.social === true)) {
          // persist user data
          const userResponse = await AjaxService.getUser(); // TODO: json check and error handling
          // todo handle social login
          console.log(profile);
          await storeItem(STORAGE.USER, JSON.stringify(userResponse.data));
        }

        resolve();
      } catch (err) {
        console.error(err);
        throw err;
      }
    });
  }
  // static async login(email, password) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const url = "https://adsnap.eu.auth0.com/oauth/ro";
  //       const data = {
  //         client_id: "ajOlns38DT3Sa3Iiahp3I4fzJY6TdrdP",
  //         connection: "Username-Password-Authentication",
  //         username: email,
  //         password: password,
  //         scope: "openid"
  //       };
  //       console.log(email, password);
  //       const response = await fetch(url, {
  //         method: "POST",
  //         body: JSON.stringify(data),
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json"
  //         }
  //       });
  //       const resJson = await response.json();
  //       if (!response.ok) {
  //         reject(resJson);
  //         return;
  //       }
  //       console.log("setting token");
  //       await AuthService.setToken(resJson.access_token, resJson.id_token);

  //       // persist user data
  //       const userResponse = await AjaxService.getUser(); // TODO: json check and error handling
  //       await storeItem(STORAGE.USER, JSON.stringify(userResponse.data));

  //       resolve(resJson);
  //     } catch (err) {
  //       console.error(err);
  //       throw err;
  //     }
  //   });
  // }

  /**
     * Signsup the user in Auth0 and retruns the auth0 user object.
     * @param {*} email
     * @param {*} password
     */
  static signup(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = "https://adsnap.eu.auth0.com/dbconnections/signup";
        console.log("email", email);
        const data = {
          client_id: "ajOlns38DT3Sa3Iiahp3I4fzJY6TdrdP",
          connection: "Username-Password-Authentication",
          email: email,
          password: password,
          scope: "openid"
        };
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });
        const resJson = await response.json();
        if (!response.ok) {
          reject(resJson);
          return;
        }

        resolve(resJson);
      } catch (err) {
        console.error(err);
        throw err;
      }
    });
  }

  /**
     * Checks if there is a saved token and it's still valid.
     */
  static isLoggedIn() {
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  /**
   * Save user access token and id token to local storage.
   * @param {*} accessToken
   * @param {*} idToken
   */
  static setToken(accessToken, idToken) {
    storeItem(STORAGE.ACCESS_TOKEN, accessToken);
    storeItem(STORAGE.ID_TOKEN, idToken);
  }
  /**
   * Save user data to local storage.
   * @param {*} user 
   */
  static setUser(user) {}

  /**
     * Retrieves user toke from storage.
     */
  static getToken() {
    return getStoredItem(STORAGE.ID_TOKEN);
  }

  /**
     * Clears user token and profile data from storage.
     */
  static logout() {
    // TODO: remove profile.
    deleteStoredItem(STORAGE.ID_TOKEN);
    deleteStoredItem(STORAGE.USER);
  }
}
