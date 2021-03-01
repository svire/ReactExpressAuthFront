import axios from "axios";

const URL = "http://localhost:8080/api/auth/";
//bez http sjebe cors policy

class Authentication {
  login(username, password) {
    return axios.post(URL + "signin", {username, password}).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new Authentication();
