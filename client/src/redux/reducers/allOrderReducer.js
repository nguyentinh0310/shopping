import {
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    CLEAR_ERRORS,
  } from "redux/contants/orderContant";
  
  const initialState = {
    orders: [],
  };
  
  const allOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALL_ORDERS_REQUEST:
        return {
          loading: true,
        };
      case ALL_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload.orders,
          totalAmount: action.payload.totalAmount
        };
      case ALL_ORDERS_FAIL:
        return {
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
  
  export default allOrderReducer;
  