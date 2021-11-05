import axiosInstance from "../axiosConfig";

const get = (url) => {
  return axiosInstance.get(url);
};

const post = (url, reqObj) => {
  return axiosInstance.post(url, reqObj);
};

const put = (url, reqObj) => {
  return axiosInstance.put(url, reqObj);
};

const remove = (url, id) => {
  return axiosInstance.delete(`${url}/${id}`);
};

const deleteById = (url, id) => {
  return axiosInstance.get(`${url}/${id}`);
};

const deleteAll = (url, reqObj) => {
  return axiosInstance.delete(url, { data: reqObj });
};

const serviceUtil = {
  get,
  post,
  put,
  remove,
  deleteById,
  deleteAll,
};

export default serviceUtil;
