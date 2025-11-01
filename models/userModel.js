const pool = require("../db");

const getUserByEmail = async (email) => {
  const user = await pool.query("select * from users where email = $1", [
    email,
  ]);
  return user.rows[0];
};

const addUser = async (name, email, password) => {
  const user = await pool.query(
    "insert into users (name,email,password) values ($1,$2,$3) returning *",
    [name, email, password]
  );
  return user.rows[0];
};

const getAllTodoList = async (userId) => {
  const data = await pool.query("select * from todos where user_id = $1", [
    userId,
  ]);
  return data.rows;
};

const addTodoListData = async (userId, desc, status) => {
  const data = await pool.query(
    "insert into todos (user_id,description,status) values ($1,$2,$3) returning *",
    [userId, desc, status]
  );
  return data.rows[0];
};

const editTodoListData = async (id, desc, status) => {
  const data = await pool.query(
    "update todos set description = $1, status = $2 where id = $3 returning *",
    [desc, status, id]
  );

  if (data.rowCount === 0) {
    throw new Error("Todo not found");
  }
  return data.rows[0];
};

const deleteTodoListData = async (id) => {
  const data = await pool.query("delete from todos where id = $1", [id]);
  if (data.rowCount === 0) {
    throw new Error("Id is not found");
  }
  return;
};

module.exports = {
  getUserByEmail,
  addUser,
  getAllTodoList,
  addTodoListData,
  editTodoListData,
  deleteTodoListData,
};
