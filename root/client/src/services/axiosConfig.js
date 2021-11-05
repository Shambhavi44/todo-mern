import axios from "axios";
console.log(process.env.SERVER);
const baseUrl = process.env.REACT_APP_SERVER;
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
