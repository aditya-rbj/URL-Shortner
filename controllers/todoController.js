const {
  getAllTodoList,
  addTodoListData,
  editTodoListData,
  deleteTodoListData,
} = require("../models/userModel");

const handleAllList = async (req, res) => {
  const { userId } = req;
  const { status } = req.query;
  if (!userId) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
  try {
    const data = await getAllTodoList(userId);
    return res.status(200).json({ todoList: data });
  } catch (err) {
    console.log("Error fetching todo list:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleAddTodo = async (req, res) => {
  const { userId } = req;
  if (!userId) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
  try {
    const { description, status = "pending" } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const data = await addTodoListData(userId, description, status);

    return res
      .status(200)
      .json({ message: "Todo added successfully", todo: data });
  } catch (err) {
    console.log("Error adding todo:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateTodo = async (req, res) => {
  const { id, description, status = "pending" } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Todo id is required" });
  } else if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const data = await editTodoListData(id, description, status);
    return res
      .status(200)
      .json({ message: "Todo updated successfully", todo: data });
  } catch (err) {
    console.log("Error updating todo:", err);

    if (err.message === "Todo not found") {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

const handledeleteTodo = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Todo id is required" });
  }

  try {
    await deleteTodoListData(id);
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.log("Error deleting todo:", err);

    if (err.message === "Id is not found") {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleAllList,
  handleAddTodo,
  handleUpdateTodo,
  handledeleteTodo,
};
