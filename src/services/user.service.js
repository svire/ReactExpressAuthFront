import axios from "axios";

import authHeader from "./auth.header";

const URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(URL + "all");
  }

  getUsers() {
    return axios.get(URL + "users");
  }

  deleteUser(id) {
    return axios.delete(URL + `users/${id}`);
  }

  getUserContent() {
    return axios.get(URL + "user", {headers: authHeader()});
  }

  getModeratorContent() {
    return axios.get(URL + "mod", {headers: authHeader()});
  }

  getAdminContent() {
    return axios.get(URL + "admin", {headers: authHeader()});
  }
}

export default new UserService();
