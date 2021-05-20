import {
    districtUrls
  } from './Network';

export async function adminLoginUtils(params) {
  const url = districtUrls(params).login;
  console.log('admin post prams', url,params)
    try {
        const response = await fetch(url, {
            method : 'POST',
            headers : {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
              'Content-Type': 'application/json',
            },
            body : JSON.stringify(params)
          });
        const json = await response.json();
        console.log('admin login response', json)
        return json;
    } catch (error) {
        return error;
    }
}
