import {
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    CLEAR_ERRORS,
  } from "redux/contants/reviewContant";
  
  const initialState = {
    reviews: [],
  };
  
  const allReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_REVIEWS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_REVIEWS_SUCCESS:
        return {
          ...state,
          loading: false,
          reviews: action.payload,
        };
      case GET_REVIEWS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export default allReviewsReducer;
  