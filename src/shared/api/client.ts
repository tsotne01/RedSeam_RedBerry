import axios from "axios";

const client = axios.create({
  baseURL: "https://api.redseam.redberryinternship.ge/api",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      delete client.defaults.headers.common["Authorization"];

      window.location.href = "/sign-in";
      console.warn("Session expired. Please log in again.");
    }

    return Promise.reject(error);
  }
);

export { client };
