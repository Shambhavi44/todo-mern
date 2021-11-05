const Todo = require("../mongoose/models/todo-model");

createItem = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an item",
    });
  }
  body.todoId =
    new Date().getTime().toString(36) + Math.random().toString(36).slice(2);

  const todo = new Todo(body);

  if (!todo) {
    return res.status(400).json({ success: false, error: err });
  }

  todo
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        id: todo._id,
        message: "todo item created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "todo item not created",
      });
    });
};

getTodos = async (req, res) => {
  await Todo.find({}, (err, todos) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!todos.length) {
      return res.status(404).json({ success: false, error: `Item not found` });
    }
    return res.status(200).json({ success: true, data: todos });
  }).catch((err) => console.log(err));
};

updateTodos = async (req, res) => {
  await Todo.findById(req.params.id, (err, todo) => {
    if (!todo) {
      return res
        .status(404)
        .send({ message: "Data not found", success: false });
    } else {
      todo.description = req.body.description;
      todo.title = req.body.title;
      todo.status = req.body.status;
      todo
        .save()
        .then((todo) => {
          res
            .status(200)
            .json({ success: true, message: "Todo updated successfully" });
        })
        .catch((error) => {
          res.status(400).json({ success: false, error });
        });
    }
  });
};

deleteTodo = async (req, res) => {
  await Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) {
      return res.status(404).send({ error: err, success: false });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Todo deleted successfully" });
    }
  });
};

module.exports = { createItem, getTodos, updateTodos, deleteTodo };
