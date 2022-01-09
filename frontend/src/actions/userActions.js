import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

//log the user in and store info in session storage
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    );
    // returns userInfo with JWT
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // TODO set jwt to secure backside cookies
    sessionStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// log the user out
export const logout = () => (dispatch) => {
  sessionStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

// register a new user and log them in
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //axios data is automatically a JSON
    const { data } = await axios.post(
      `/api/users`,
      { name, email, password },
      config
    );
    //TODO --when I add more info on the login process I will need to add
    //a separate payload for the login success
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // TODO set jwt to secure backside cookies
    sessionStorage.setItem("userInfo", JSON.stringify(data));
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

// Get full user details for profile page
export const getUserDetails =
  //can pull user details using their ID or using the sting 'profile"
  //if the user is logged in
  (idOrProfileString) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      // get userInfo out of state for JWT and add to header config
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      //axios data is automatically a JSON
      const { data } = await axios.get(
        `api/users/${idOrProfileString}`,
        config
      );
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// update the user's profile
export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    // get userInfo out of state for JWT and put it in header config
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //axios data is automatically a JSON
    const { data } = await axios.put(`api/users/profile`, user, config);
    //separate payload for userLogin to update login state
    const loginPayload = {
      _id: data._id,
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin,
      token: data.token,
    };
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: loginPayload });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
