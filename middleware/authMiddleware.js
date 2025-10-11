const jwt = require("jsonwebtoken");
const { getUserById } = require("../models/userModel");
const seceret = "Dmrkj@12345";

const isValidUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const jwtToken = token.split(" ")[1];

  try {
    // const validUser = await getUserById(user_id);   --------> here we are query the db to get the user it is slow and dont scale because on each request we are calling db to validate
    const validUser = jwt.verify(jwtToken, seceret); // ------> this is stateless authentication where we are not storing user_id in cookies or session we are using jwt to validate user
    // if (validUser.length === 0) {
    //   res.status(401).json({ message: "Unauthorized: Invalid user" });
    //   return;
    // }
    // req.user = validUser?.[0];
    req.user = validUser;
    next();
  } catch (err) {
    console.error("Error validating user:", err);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { isValidUser };
