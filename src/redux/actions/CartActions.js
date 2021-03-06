import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../actionTypes";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  fetch(`https://elie-project.herokuapp.com/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          name: data.name,
          image: data.image,
          price: data.price,
          count: data.count,
          product: data._id,
          qty: qty,
        },
      });
      console.log(getState());
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    });
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (method) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: method });
};
