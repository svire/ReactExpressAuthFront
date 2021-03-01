export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  //check local storage for user
  if (user && user.accessToken) {
    //return HTTP Authorization header
    //return {Authorization: "Header" + user.accessToken};
    // for Node.js Express back-end
    return {"x-access-token": user.accessToken};
  } else {
    return {};
  }
}
