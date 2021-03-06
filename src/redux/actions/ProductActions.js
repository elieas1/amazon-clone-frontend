import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../actionTypes"

export const listProducts = () => (dispatch)=>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    fetch("https://elie-project.herokuapp.com/api/products")
      .then((response) => response.json())
      .then((products) => {
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
      })
      .catch((e) => {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: e.message });
      });
}

export const detailsProduct=(id)=> (dispatch)=>{
    dispatch({type:PRODUCT_DETAILS_REQUEST,payload:id})
    fetch(`https://elie-project.herokuapp.com/api/products/${id}`)
      .then((response) => response.json())
      .then((product) => {
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
      })
      .catch((e) => {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: e.message });
      });
}