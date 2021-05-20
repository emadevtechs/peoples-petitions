import {
    userUrls,districtUrls
  } from './Network';
  
  export async function createNewUser(params) {
    const url = userUrls(params).create;
    console.log('creat☺e user req',url,params);
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
          console.log('create user response', json);
          return json;
      } catch (error) {
          return error;
      }
  }
  
  export async function getDistrictLists(questionParams) {    
    const url = districtUrls().list;
    try {
        const response = await fetch(url);
        const json = await response.json();
        // console.log('get districts json',json);
        return json;
    } catch (error) {
        return error;
    }
  }

export async function userLoginUtils(params) {
  const url = userUrls(params).login;
  console.log('user post prams', url,params)
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
        console.log('user login response', json)
        return json;
    } catch (error) {
        return error;
    }
}
