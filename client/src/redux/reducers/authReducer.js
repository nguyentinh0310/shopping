import {
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
} from "../contants/userContant";

let user = JSON.parse(localStorage.getItem("userInfo"));
const initialState = user ? user : {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        err: action.payload,
      };
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,

      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        err: action.payload,
      };
    case GET_USER_REQUEST:
      return {
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAdmin: action.payload,
      };

    case GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        err: action.payload,
      };
    case LOGOUT: {
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    }
    case CLEAR_ERRORS:
      return {
        ...state,
        err: null,
      };
    default:
      return state;
  }
};

export default authReducer;
