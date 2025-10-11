const { getUserById } = require("../models/userModel");

const isValidUser = async (req, res, next) => {
  const user_id = req.cookies.user_id;

  if (!user_id) {
    res.status(401).json({ message: "Unauthorized: No user ID found" });
    return;
  }

  try {
    const validUser = await getUserById(user_id);
    if (validUser.length === 0) {
      res.status(401).json({ message: "Unauthorized: Invalid user" });
      return;
    }
    req.user = validUser?.[0];
    next();
  } catch (err) {
    console.error("Error validating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { isValidUser };
