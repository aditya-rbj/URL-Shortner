const pool = require("../db");

const getUserByEmail = async (email) => {
  const result = await pool.query("select * from user_info where email =$1", [
    email,
  ]);
  return result.rows;
};

const addUser = async (email, password) => {
  const result = await pool.query(
    "insert into user_info (email,password) values ($1,$2) returning *",
    [email, password]
  );
  return result.rows[0];
};

const getUserById = async (userId) => {
  const result = await pool.query("select * from user_info where new_id = $1", [
    userId,
  ]);
  return result.rows;
};

module.exports = { getUserByEmail, addUser, getUserById };
