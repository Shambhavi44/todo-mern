const express = require("express");
const router = express.Router();

const todoCtrl = require("../controllers/todo-ctrl");

router.post("/todo/save", todoCtrl.createItem);
router.get("/todo/get", todoCtrl.getTodos);
router.post("/todo/update/:id", todoCtrl.updateTodos);
router.delete("/todo/delete/:id", todoCtrl.deleteTodo);

module.exports = router;
