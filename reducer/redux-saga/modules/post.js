export const constants = {

    GET_MY_POSTS: 'GET_MY_POSTS',
    GET_MY_POSTS_SUCCESS: 'GET_MY_POSTS_SUCCESS',
    GET_MY_POSTS_FAILURE: 'GET_MY_POSTS_FAILURE',

    GET_POSTS_BY_DISTRICT: 'GET_POSTS_BY_DISTRICT',
    GET_POSTS_BY_DISTRICT_SUCCESS: 'GET_POSTS_BY_DISTRICT_SUCCESS',
    GET_POSTS_BY_DISTRICT_FAILURE: 'GET_POSTS_BY_DISTRICT_FAILURE',

    CREATE_MY_POST: 'CREATE_MY_POST',
    CREATE_MY_POST_SUCCESS: 'CREATE_MY_POST_SUCCESS',
    CREATE_MY_POST_FAILURE: 'CREATE_MY_POST_FAILURE',

    UPDATE_POST: 'UPDATE_POST',
    UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',
    UPDATE_POST_FAILURE: 'UPDATE_POST_FAILURE',

    CLEAR_MESSAGE: "CLEAR_MESSAGE",
    POST_DATA: "POST_DATA"
  };
  
  export const actions = {

    getMyPosts: (params) => {
      console.log('GET_MY_POSTS',params)
      return {
        type: constants.GET_MY_POSTS,
        payload: params,
      };
    },

    getMyPostsSuccess: (response) => {
      return {
        type: constants.GET_MY_POSTS_SUCCESS,
        payload: response,
      };
    },

    getMyPostsFailure: (response) => {
      return {
        type: constants.GET_MY_POSTS_FAILURE,
        payload: response,
      };
    },

    getPostsByDistrict: (params) => {
      console.log('GET_MY_POSTS',params)
      return {
        type: constants.GET_POSTS_BY_DISTRICT,
        payload: params,
      };
    },

    getPostsByDistrictSuccess: (response) => {
      return {
        type: constants.GET_POSTS_BY_DISTRICT_SUCCESS,
        payload: response,
      };
    },

    getPostsByDistrictFailure: (response) => {
      return {
        type: constants.GET_POSTS_BY_DISTRICT_FAILURE,
        payload: response,
      };
    },

    createMyPost: (params) => {
      return {
        type: constants.CREATE_MY_POST,
        payload: params,
      };
    },

    createMyPostSuccess: (response) => {
      return {
        type: constants.CREATE_MY_POST_SUCCESS,
        payload: response,
      };
    },

    createMyPostFailure: (response) => {
      return {
        type: constants.CREATE_MY_POST_FAILURE,
        payload: response,
      };
    },

    updatePost: (params) => {
      console.log('UPDATE_POST',params)
      return {
        type: constants.UPDATE_POST,
        payload: params,
      };
    },

    updatePostSuccess: (response) => {
      return {
        type: constants.UPDATE_POST_SUCCESS,
        payload: response,
      };
    },

    updatePostFailure: (response) => {
      return {
        type: constants.UPDATE_POST_FAILURE,
        payload: response,
      };
    },

    clearMessage: () => {
      return {
        type: constants.CLEAR_MESSAGE,
        payload: null
      }
    },

    passPost: (params) => {
      return {
        type: constants.POST_DATA,
        payload: params
      }
    }

  };
  
  export const initialState = {
    my_posts: null,
    isLoading: false,
    getPostMessage: null,
    createPostMessage: null,
    updatePostMessage: null,
    district_posts: null,
    currentPost: null
  };
  
  export const postReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case constants.POST_DATA:
        return {
          ...state,
          currentPost: action.payload
        }
      case constants.CLEAR_MESSAGE:
        return {
          ...state,
          getPostMessage: null,
          createPostMessage: null,
          updatePostMessage: null
        }
      case constants.GET_MY_POSTS:
        return {
          ...state,
          isLoading: true,
          my_posts: null,
        };
      case constants.GET_MY_POSTS_SUCCESS:
        return {
          ...state,
          getPostMessage: action.payload.data.message,
          my_posts: action.payload.data.data,
          isLoading: false,
        };
      case constants.GET_MY_POSTS_FAILURE:
        return {
          ...state,
          isLoading: false,
          my_posts: null,
        };
      case constants.CREATE_MY_POST:
        return {
          ...state,createPostMessage: null
        };
      case constants.CREATE_MY_POST_SUCCESS:
        return {
          ...state,
          createPostMessage: action.payload.data.message,
        };
      case constants.CREATE_MY_POST_FAILURE:
        return {
          ...state,createPostMessage: null
        };
      case constants.UPDATE_POST:
        return {
          ...state,updatePostMessage: null
        };
      case constants.UPDATE_POST_SUCCESS:
        return {
          ...state,
          updatePostMessage: action.payload.data.message,
        };
      case constants.UPDATE_POST_FAILURE:
        return {
          ...state,updatePostMessage: null
        };
      case constants.GET_POSTS_BY_DISTRICT:
        return {
          ...state,
          isLoading: true,
          district_posts: null,
        };
      case constants.GET_POSTS_BY_DISTRICT_SUCCESS:
        return {
          ...state,
          getPostMessage: action.payload.data.message,
          district_posts: action.payload.data.data,
          isLoading: false,
        };
      case constants.GET_POSTS_BY_DISTRICT_FAILURE:
        return {
          ...state,
          isLoading: false,
          district_posts: null,
        };
      default:
        return state;
    }
  };
  
  export default actions;
  