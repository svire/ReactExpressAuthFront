import * as sve from "./types";

import authService from "../../services/auth.service";
import userService from "../../services/user.service";

export const deleteUser = (id) => (dispatch) => {
  return userService.deleteUser(id).then(
    (response) => {
      dispatch({
        type: sve.SET_MESSAGE,
        //payload: response["data"]["message"],
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({type: sve.SET_MESSAGE, payload: message});

      return Promise.reject();
    }
  );
};

export const register = (username, email, password) => (dispatch) => {
  return authService.register(username, email, password).then(
    (response) => {
      dispatch({type: sve.REGISTER_SUCCESS});
      dispatch({
        type: sve.SET_MESSAGE,
        payload: response.data.message,
      });

      //Promise.resolve() method returns a Promise object that is resolved with a given value.
      //if the value is a thenable (i.e. has a "then" method), the returned promise will "follow" that thenable, adopting its eventual state
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({type: sve.REGISTER_FAIL});
      dispatch({type: sve.SET_MESSAGE, payload: message});
      //The Promise.reject() method returns a Promise object that is rejected with a given reason.
      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  authService.login(username, password).then(
    (data) => {
      dispatch({type: sve.LOGIN_SUCCESS, payload: {user: data}});

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: sve.LOGIN_FAIL,
      });

      dispatch({type: sve.SET_MESSAGE, payload: message});
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({type: sve.LOGOUT});
};
