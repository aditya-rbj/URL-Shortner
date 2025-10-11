const jwt = require("jsonwebtoken");
const { getUserByEmail, addUser } = require("../models/userModel");

const seceret = "Dmrkj@12345";

const handleSignup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are required" });
    return;
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const user = await addUser(email, password);
    res.status(201).json({ message: "User added successfully", user });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are required" });
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (user.length === 0) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
    const validCreds = user?.[0]?.password === password;
    if (!validCreds) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }
    // res.cookie("user_id", user?.[0]?.new_id);  ----> this is statefull authentication where we store user_id in cookies

    const data = { email: user?.[0]?.email, id: user?.[0]?.new_id };
    const token = jwt.sign(data, seceret);
    res.status(200).json({ message: "Login Successful", login: { token } });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleLogout = (req, res) => {
  // For JWT, logout is typically handled on the client side by deleting the token.
  // If using cookies or sessions, you would clear the cookie or destroy the session here.
  res.status(200).json({ message: "Logout Successful" });
};

module.exports = { handleSignup, handleLogin, handleLogout };
