import axios from "axios";
import {
  CLEAR_ERRORS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
} from "redux/contants/reviewContant";

export const newReview = (token,reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.put(`/api/product/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get product reviews
export const getProductReviews = (token,id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/api/product/reviews/all?id=${id}`,config);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete product review
export const deleteReview = (token, id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const config = {
        headers: {
          Authorization: token,
        },
      };

    const { data } = await axios.delete(
      `/api/product/reviews/sp?id=${id}&productId=${productId}`, config
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
