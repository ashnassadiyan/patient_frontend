import axios from "axios";

const url = process.env.REACT_APP_API;

const http = axios.create({
  baseURL: `${url}/`,
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("osc-token")) || "";
  config.headers = config.headers || {};
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("osc-token");
        localStorage.removeItem("osc-user");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default http;
