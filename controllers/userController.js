const { getUserByEmail, addUser } = require("../models/userModel");

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
    res.cookie("user_id", user?.[0]?.new_id);
    res.status(200).json({ message: "Login Successful" });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { handleSignup, handleLogin };
