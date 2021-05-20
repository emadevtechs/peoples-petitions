export const constants = {

    ADMIN_LOGIN: 'ADMIN_LOGIN',
    ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    ADMIN_LOGIN_FAILURE: 'ADMIN_LOGIN_FAILURE',
  
    CLEAR_MESSAGE: "CLEAR_MESSAGE"
  };

  export const actions = {
    adminLogin: (params) => {
        console.log('admin calling')
        return {
          type: constants.ADMIN_LOGIN,
          payload: params,
        };
      },
  
      adminLoginSuccess: (response) => {
        return {
          type: constants.ADMIN_LOGIN_SUCCESS,
          payload: response,
        };
      },
  
      adminLoginFailure: (response) => {
        return {
          type: constants.ADMIN_LOGIN_FAILURE,
          payload: response,
        };
      },
  
      clearMessage: () => {
        return {
          type: constants.CLEAR_MESSAGE,
          payload: null
        }
      }
  }

  export const initialState = {
    admin_details: null,
    isLoading: false,
    adminLoginMessage: null,
  };

  export const adminReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case constants.CLEAR_MESSAGE:
        return {
          ...state,
          adminLoginMessage: null
        }
      case constants.ADMIN_LOGIN:
        return {
          ...state,
          isLoading: true,
        };
      case constants.ADMIN_LOGIN_SUCCESS:
        return {
          ...state,
          admin_details: action.payload.data.data,
          adminLoginMessage: action.payload.data.message,
          isLoading: false,
        };
      case constants.ADMIN_LOGIN_FAILURE:
        return {
          ...state,
          admin_details: null,
          adminLoginMessage: action.payload.data.message,
          isLoading: false,
        };
      default:
        return state;
    }
  };
  
  export default actions;
  