import {
    postUrls,
  } from './Network';
  
  export async function createNewPost(params) {
    const url = postUrls(params).create;
    console.log('create post url', url,params)
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
          console.log('create post response', json)
          return json;
      } catch (error) {
          return error;
      }
  }
  
  export async function updatePost(params) {
    const url = postUrls(params).create;
    console.log('update post url', url,params)
      try {
          const response = await fetch(url, {
              method : 'PUT',
              headers : {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json',
              },
              body : JSON.stringify(params)
            });
          const json = await response.json();
          console.log('update post response', json)
          return json;
      } catch (error) {
          return error;
      }
  }

  export async function getMyPosts(params) {    
    console.log('post get rl', params);
    const url = postUrls(params).byuser;
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log('ger post response', json)
        return json;
    } catch (error) {
        return error;
    }
  }

  export async function getPostsByDistrict(params) {    
    console.log('post get rl', params);
    const url = postUrls(params).bydis;
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log('ger admin post response', json)
        return json;
    } catch (error) {
        return error;
    }
  }
