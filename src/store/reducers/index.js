import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import some from "./some";

export default combineReducers({
  auth,
  message,
  some,
});
