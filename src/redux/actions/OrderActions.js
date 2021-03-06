import {
  CART_EMPTY,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS
} from "../actionTypes";

export const createdOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  console.log(order);
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const request = await fetch(
      "https://elie-project.herokuapp.com/api/orders",
      {
        method: "POST",
        body: JSON.stringify({
          cart: order.cart,
          orderItems: order.orderItems,
        }),
        headers: {
          "content-type": "Application/Json",
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    if (request.ok) {
      const order = await request.json();
      console.log(order);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: order.order });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem("cartItems");
    } else {
      throw new Error("qweqwee");
    }
  } catch (e) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: e.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const request = await fetch(
      `https://elie-project.herokuapp.com/api/orders/${orderId}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    if (request.ok) {
      const data = await request.json();
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } else {
      throw new Error("error");
    }
  } catch (e) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: e.message });
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST , payload: { order, paymentResult } });
  const {
    userSignIn: { userInfo },
  } = getState();

  try {
    const request = await fetch(
      `https://elie-project.herokuapp.com/api/orders/${order._id}/pay`,
      {
        method: "POST",
        body: JSON.stringify(paymentResult),
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    if (request.ok) {
      const data = await request.json();
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } else {
      throw new Error("error");
    }
  } catch (e) {
    dispatch({ type: ORDER_PAY_FAIL, payload: e.message });
  }
};
