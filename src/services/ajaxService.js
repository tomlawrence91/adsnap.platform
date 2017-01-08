
export const baseUrl = 'http://192.168.178.24:8000/v1';
// export const baseUrl = 'http://192.168.22.22/v1/';
export const flaskBaseUrl = 'http://127.0.0.1:5000/';

export const auth0Url = 'https://adsnap.eu.auth0.com';
const urls = {
  imageUploadUrl: baseUrl + '/upload/img?XDEBUG_SESSION_START=99999',
  retrieveDealsUrl: `${baseUrl}/users/deals`,
  testUrl: `${baseUrl}/test`,

  imageClassifierUrl: flaskBaseUrl + 'search',

  //auth0
  auth0loginUrl: `${auth0Url}/oauth/ro`,
  auth0signupUrl: `${auth0Url}/dbconnections/signup`
}

/* function to serialize a JS object to a querystring */
function serialize(obj, prefix) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

/* default function to perform an ajax get request */
async function ajaxGetRequest(url, data = {}) {
  // console.log('token: '+JWT_TOKEN)
  data["XDEBUG_SESSION_START"] = 99999;
  var str = data ? ('?' + serialize(data)) : '';

  let response = await fetch(url + str, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      // 'Authorization': 'Bearer ' + JWT_TOKEN,
    }
  });
  return response;
}

/* default function to perform an ajax post request */
async function ajaxPostRequest(url, data = {}) {
  // console.log('token: '+JWT_TOKEN)
  // data["XDEBUG_SESSION_START"]=99999;
  let JWT_TOKEN = ''
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      // 'Authorization': 'Bearer ' + JWT_TOKEN,
    }
  })
}

/* default function to perform an ajax post request */
async function ajaxPutRequest(url, data = {}) {
  // console.log('token: '+JWT_TOKEN)
  data["XDEBUG_SESSION_START"] = 99999;
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      // 'Authorization': 'Bearer ' + JWT_TOKEN,
    }
  })
}

function handleErrors(response) {
  console.log(response)
  if (!response.ok) {
    throw Error(response);
  }
  return response;
}

/* -> All the custom ajax functions */
export async function retrieveDeals() {
  let response = await ajaxGetRequest(urls.retrieveDealsUrl);
  let data = await response.json();
  return data;
}

export async function uploadImage(fd) {
  // var formData = new FormData();
  // console.log(fd)
  // console.log(fd.get('file'))
  console.log(fd['path'])
  var photo = {
    path: fd['path'],
    type: 'image/jpeg',
    name: 'photo.jpg',
  };

  var body = new FormData();
  // body.append('authToken', 'secret');
  body.append('file', photo);
  body.append('title', 'A beautiful photo!');

  let headers = new Headers();
  headers.append('Accept', 'application/json')
  // headers.append('content-type', 'undefined')
  //data["XDEBUG_SESSION_START"]=99999;
  return fetch(urls.imageUploadUrl, {
    method: 'POST',
    body: body,
    headers: headers
  }).then((res) => handleErrors(res))
}

export async function auth0login(username, password) {
  let response = await ajaxPostRequest(urls.auth0loginUrl,
    {
      "client_id": "ajOlns38DT3Sa3Iiahp3I4fzJY6TdrdP",
      "username": username,
      "password": password,
      "connection": "Username-Password-Authentication",
      "grant_type": "password"
      // "scope": "openid", //to get auth0 id_token
    });
  let data = await response.json();
  return data;
}

export async function auth0signup(email, password) {
  let response = await ajaxPostRequest(urls.auth0signupUrl,
    {
      "client_id": "ajOlns38DT3Sa3Iiahp3I4fzJY6TdrdP",
      "email": email,
      "password": password,
      "connection": "Username-Password-Authentication",
    });
  let data = await response.json();
  return data;
}