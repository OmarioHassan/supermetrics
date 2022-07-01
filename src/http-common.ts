import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// console.log(process.env.REACT_APP_BASE_URL);

// Token expire error
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 500) {
      localStorage.removeItem("user_token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
