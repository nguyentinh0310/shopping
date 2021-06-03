import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import products from "./reducers/productReducer";
import productDetail from "./reducers/productDetailsReducer";
import auth from "./reducers/authReducer";
import token from "./reducers/tokenReducer";
import forgotPassword from "./reducers/forgotPasswordReducer";
import userReducer from "./reducers/userReducer";
import cart from "./reducers/cartReducer";
import newProduct from "./reducers/newProductReducer";
import handleProduct from "./reducers/handleProductReducer";
import allUser from "./reducers/allUserReducer";
import userDetail from "./reducers/userDetailReducer";
import allOrder from "./reducers/allOrderReducer";
import myOrder from "./reducers/myOrderReducer";
import orderDetail from "./reducers/orderDetailReducer";
import newOrder from "./reducers/newOrderReducer";
import handleOrder from "./reducers/handleOrderReducer";
import allReviews from "./reducers/allReviewsReducer";
import deleteReview from "./reducers/deleteReviewReducer";
import newReview from "./reducers/newReviewReducer";

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

export default function makeStore(initState = initialState) {
  const reducer = combineReducers({
    products,
    productDetail,
    auth,
    token,
    forgotPassword,
    userReducer,
    cart,
    newProduct,
    handleProduct,
    allUser,
    userDetail,
    allOrder,
    myOrder,
    orderDetail,
    newOrder,
    handleOrder,
    allReviews,
    newReview,
    deleteReview,
  });

  const middleware = [thunk];

  const store = createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
}
