import * as actionType from '../constants/actionTypes.js';


const authReducer = (auth = { authData: null,isAuthenticated:false }, action) => {
  switch (action.type) {
    case actionType.AUTH_SIGNIN:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...auth, authData: action.data,isAuthenticated:true,};
    case actionType.AUTH_SIGNUP:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...auth, authData: action.data};
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...auth, authData: null,isAuthenticated:false, };
    default:
      return auth;
  }
};

export default authReducer;