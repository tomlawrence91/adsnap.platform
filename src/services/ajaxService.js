
export const baseUrl = 'http://192.168.178.24:8000/v1'
// export const baseUrl = 'http://192.168.22.22/v1/'
export const flaskBaseUrl = 'http://127.0.0.1:5000/'
const urls ={
    imageUploadUrl: baseUrl + 'upload/img',
    retrieveDealsUrl: `${baseUrl}/users/deals`,
    testUrl: `${baseUrl}/test`,
   
    imageClassifierUrl: flaskBaseUrl + 'search'
}

/* function to serialize a JS object to a querystring */
function serialize(obj, prefix) {
  var str = [];
  for(var p in obj) {
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
async function ajaxGetRequest(url, data={}) {
  // console.log('token: '+JWT_TOKEN)
  data["XDEBUG_SESSION_START"]=99999;
  var str = data?('?'+serialize(data)):'';

  let response = await fetch(url+str, {
    method: 'GET',
    headers:{
      'content-type': 'application/json',
      // 'Authorization': 'Bearer ' + JWT_TOKEN,
    }
  });
  return response; 
}

/* default function to perform an ajax post request */
async function ajaxPostRequest(url, data={}) {
  // console.log('token: '+JWT_TOKEN)
  // data["XDEBUG_SESSION_START"]=99999;
  let JWT_TOKEN = ''
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'content-type': 'application/json',
      // 'Authorization': 'Bearer ' + JWT_TOKEN,
    }
  })
}

/* default function to perform an ajax post request */
// async function ajaxPutRequest(url, data={}) {
//   console.log('token: '+JWT_TOKEN)
//   data["XDEBUG_SESSION_START"]=99999;
//   return fetch(url, {
//     method: 'PUT',
//     body: JSON.stringify(data),
//     headers:{
//       'content-type': 'application/json',
//       'Authorization': 'Bearer ' + JWT_TOKEN,
//     }
//   })
// }

function handleErrors(response) {
  console.log(response)
    if (!response.ok) {
      throw Error(response);
    }
    return response;
}

/* -> All the custom ajax functions */
export async function retrieveDeals(){
  let response = await ajaxGetRequest(urls.retrieveDealsUrl);
  let data = await response.json();
  return data;
}