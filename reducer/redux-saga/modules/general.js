export const constants = {  
    USER_TYPE: "USER_TYPE"
  };
  
  export const actions = {

    setUserType: (params) => {
      console.log('create user',params)
      return {
        type: constants.USER_TYPE,
        payload: params,
      };
    },

  };
  
  export const initialState = {
    is_admin: false,
  };
  
  export const generalReducer = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case constants.USER_TYPE:
        return {
          ...state,
          is_admin: action.payload
        }
      default:
        return state;
    }
  };
  
  export default actions;
  