import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("items"));

const initialState = user
  ? {isLoggedIn: true, user}
  : {isLoggedIn: false, user: null};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {...state, isLoggedIn: false};

    case REGISTER_FAIL:
      return {...state, isLoggedIn: false};

    case LOGIN_SUCCESS:
      //vraca response
      return {...state, isLoggedIn: true, user: payload.user};

    case LOGIN_FAIL:
      return {...state, isLoggedIn: false, user: false};

    case LOGOUT:
      return {...state, isLoggedIn: false, user: false};

    default:
      return state;
  }
}
