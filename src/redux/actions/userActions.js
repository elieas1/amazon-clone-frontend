import {
  USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../actionTypes";

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const data = await fetch(
      "https://elie-project.herokuapp.com/api/users/signin",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        credentials: "same-origin",
      }
    );
    if (data.ok) {
      const response = await data.json();
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: response,
      });
      localStorage.setItem("userInfo", JSON.stringify(response));
    } else {
      throw new Error("Wrong username or password");
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItem");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_SIGNOUT });
};

export const register = (username, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });
  try {
    const data = await fetch(
      "https://elie-project.herokuapp.com/api/users/register",
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        credentials: "same-origin",
      }
    );
    if (data.ok) {
      const response = await data.json();
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: response,
      });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: response,
      });
      localStorage.setItem("userInfo", JSON.stringify(response));
    } else {
      throw new Error('email already exists');
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
