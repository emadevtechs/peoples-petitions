export const constants = {

    CREATE_USER: 'CREATE_USER',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILURE: 'CREATE_USER_FAILURE',

    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILURE: 'USER_LOGIN_FAILURE',

    GET_DISTRICTS: 'GET_DISTRICTS',
    GET_DISTRICTS_SUCCESS: 'GET_DISTRICTS_SUCCESS',
    GET_DISTRICTS_FAILURE: 'GET_DISTRICTS_FAILURE',

    GET_USER_DETAILS: 'GET_USER_DETAILS',
    GET_USER_DETAILS_SUCCESS: 'GET_USER_DETAILS_SUCCESS',
    GET_USER_DETAILS_FAILURE: 'GET_USER_DETAILS_FAILURE',
  
    CLEAR_MESSAGE: "CLEAR_MESSAGE"
  };
  
  export const actions = {

    getUserDetails: (params) => {
      console.log('create user',params)
      return {
        type: constants.GET_USER_DETAILS,
        payload: params,
      };
    },

    getUserDetailsSuccess: (response) => {
      return {
        type: constants.GET_USER_DETAILS_SUCCESS,
        payload: response,
      };
    },

    getUserDetailsFailure: (response) => {
      return {
        type: constants.GET_USER_DETAILS_FAILURE,
        payload: response,
      };
    },

    createUser: (params) => {
      console.log('create user',params)
      return {
        type: constants.CREATE_USER,
        payload: params,
      };
    },

    createUserSuccess: (response) => {
      return {
        type: constants.CREATE_USER_SUCCESS,
        payload: response,
      };
    },

    createUserFailure: (response) => {
      return {
        type: constants.CREATE_USER_FAILURE,
        payload: response,
      };
    },

    getDistricts: (params) => {
      return {
        type: constants.GET_DISTRICTS,
        payload: params,
      };
    },

    getDistrictsSuccess: (response) => {
      return {
        type: constants.GET_DISTRICTS_SUCCESS,
        payload: response,
      };
    },

    getDistrictsFailure: (response) => {
      return {
        type: constants.GET_DISTRICTS_FAILURE,
        payload: response,
      };
    },

    userLogin: (params) => {
      console.log('user calling')
      return {
        type: constants.USER_LOGIN,
        payload: params,
      };
    },

    userLoginSuccess: (response) => {
      return {
        type: constants.USER_LOGIN_SUCCESS,
        payload: response,
      };
    },

    userLoginFailure: (response) => {
      return {
        type: constants.USER_LOGIN_FAILURE,
        payload: response,
      };
    },

    clearMessage: () => {
      return {
        type: constants.CLEAR_MESSAGE,
        payload: null
      }
    }
  };
  
  export const initialState = {
    user_details: null,
    isLoading: false,
    userRegisterMessage: null,
    userLoginMessage: null,
    districtsList: null,
  };
  
  export const userReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case constants.CLEAR_MESSAGE:
        return {
          ...state,
          userRegisterMessage: null,
          userLoginMessage: null
        }
      case constants.CREATE_USER:
        return {
          ...state,
          isLoading: true,
        };
      case constants.CREATE_USER_SUCCESS:
        return {
          ...state,
          userRegisterMessage: action.payload.data.message,
          isLoading: false,
        };
      case constants.CREATE_USER_FAILURE:
        return {
          ...state,
          userRegisterMessage: action.payload.data.message,
          isLoading: false,
        };
      case constants.GET_DISTRICTS:
        return {
          ...state,districtsList: null
        };
      case constants.GET_DISTRICTS_SUCCESS:
        return {
          ...state,
          districtsList: action.payload.data.data,
        };
      case constants.GET_DISTRICTS_FAILURE:
        return {
          ...state,
          districtsList: null
        };
      case constants.USER_LOGIN:
        return {
          ...state,
          isLoading: true,
        };
      case constants.USER_LOGIN_SUCCESS:
        return {
          ...state,
          user_details: action.payload.data.data,
          userLoginMessage: action.payload.data.message,
          isLoading: false,
        };
      case constants.USER_LOGIN_FAILURE:
        return {
          ...state,
          userLoginMessage: action.payload.data.message,
          isLoading: false,
        };
      default:
        return state;
    }
  };
  
  export default actions;
  