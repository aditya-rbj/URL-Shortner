const { getUserByEmail, addUser } = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const privateKey = "Dmska@123";

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  // Further signup logic goes here
  try {
    const user = await getUserByEmail(email);
    if (user?.email === email) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Code to insert new user into the database would go here

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await addUser(name, email, hashedPassword);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(data, privateKey, { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleSignup, handleLogin };
