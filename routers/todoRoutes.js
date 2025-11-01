const express = require("express");
const {
  handleAllList,
  handleAddTodo,
  handleUpdateTodo,
  handledeleteTodo,
} = require("../controllers/todoController");

const todoRouter = express.Router();

todoRouter.get("/all_list", handleAllList);

todoRouter.post("/add_todo", handleAddTodo);

todoRouter.post("/update_todo", handleUpdateTodo);

todoRouter.delete("/delete_todo", handledeleteTodo);

module.exports = todoRouter;
