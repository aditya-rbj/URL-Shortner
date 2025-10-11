const express = require("express");
const { handleSignup, handleLogin } = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/register", handleSignup);

userRoute.post("/login", handleLogin);

// userRoute.get("/logout", handleLogout);

module.exports = userRoute;
