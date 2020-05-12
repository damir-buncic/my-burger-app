import * as actionTypes from "./actionTypes";
import axios from "axios";

const SIGN_IN =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCp684cd-QEeI_SHHO4LY_bVsyq-5AIPE4";
const SIGN_UP =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCp684cd-QEeI_SHHO4LY_bVsyq-5AIPE4";

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId
});

export const authFailed = error => ({
  type: actionTypes.AUTH_FAILED,
  error
});

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(isSignup ? SIGN_UP : SIGN_IN, {
        email,
        password,
        returnSecureToken: true
      })
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFailed(error.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if(expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId")
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
      }
    }
  };
};
