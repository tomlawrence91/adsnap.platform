import { isTokenExpired } from '../utils/jwtHelper'
import auth0 from 'auth0-js'
import { storeItem, getStoredItem, deleteStoredItem } from '../utils/storageUtils';
import * as STORAGE from '../constants/storageNames';

export default class AuthService {
    static auth0 = new auth0.WebAuth({
        clientID: 'ajOlns38DT3Sa3Iiahp3I4fzJY6TdrdP',
        domain: 'adsnap.eu.auth0.com'
    })

    /**
     * Logsin the user in Auth0, stores the token and retruns the auth0 user object.
     * @param {*} email
     * @param {*} password
     */
    static async login(email, password) {
        return new Promise((resolve, reject) => {
            this.auth0.client.login({
                realm: 'Username-Password-Authentication',
                responseType: 'token',
                username: email,
                password,
            }, (err, user) => {
                if (err) {
                    reject(err)
                    return;
                }
                AuthService.setToken(user.accessToken, user.idToken)
                resolve(user)
            })
        });
    }

    /**
     * Signsup the user in Auth0 and retruns the auth0 user object.
     * @param {*} email
     * @param {*} password
     */
    static async signup(email, password) {
        return new Promise((resolve, reject) => {
            this.auth0.signup({
                connection: 'Username-Password-Authentication',
                email,
                password,
            }, (err, user) => {
                if (err) {
                    reject(err)
                }
                resolve(user)
            })
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
     * Retrieves user toke from storage.
     */
    static getToken() {
        return localStorage.getStoredItem(STORAGE.ID_TOKEN);
    }

    /**
     * Clears user token and profile data from storage.
     */
    static logout() {
        // TODO: remove profile.
        deleteStoredItem(STORAGE.ID_TOKEN);
    }
}
