import serviceUtil from "../utils";

const getTods = () => {
  return serviceUtil
    .get("/todo/get")
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const saveTodos = (reqObj) => {
  return serviceUtil
    .post("/todo/save", reqObj)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const updateTodos = (id, reqObj) => {
  return serviceUtil
    .post(`/todo/update/${id}`, reqObj)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const deleteTodos = (id) => {
  return serviceUtil
    .remove("/todo/delete", id)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getTods, updateTodos, deleteTodos, saveTodos };
