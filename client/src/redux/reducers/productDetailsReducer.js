import {
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_REQUESTS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS
} from '../contants/productContant'

const initialState = {
    product: {},

}

const productDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUESTS:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export default productDetailsReducer