import axios from "axios";
const baseUrl = "http://localhost:8080";
axios.defaults.baseURL = baseUrl;
const axiosInstance = axios.create({ baseUrl });

axiosInstance.interceptors.response.use(undefined, (err) => {
  const error = err.response;
  if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
    error.config.__isRetryRequest = true;
    return axios(error.config);
  }
  return axios(error.config);
});

export default axiosInstance;
