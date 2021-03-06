import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../actionTypes";

export const productListReducer = (
  state = { loading: true, products: [], error: false },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [], error: false };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload, error: false };
    case PRODUCT_LIST_FAIL:
      return { loading: false, products: [], error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = {
    loading: true,
    product: [],
    error: false,
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: [], error: false };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload, error: false };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, product: [], error: action.payload };
    default:
        return state
  }
};
