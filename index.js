const express = require("express");
const userRouter = require("./routers/userRoutes");
const todoRouter = require("./routers/todoRoutes");
const { handleValidUser } = require("./middleware/auth");

const PORT = 8000;

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use("/todo", handleValidUser, todoRouter);

app.listen(PORT, () => {
  console.log("server has started at port", PORT);
});
