const jwt = require("jsonwebtoken");

const privateKey = "Dmska@123";
const handleValidUser = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const actualToken = token.split(" ")[1]; // Assuming Bearer token format

  try {
    const decoded = jwt.verify(actualToken, privateKey);
    req.userId = decoded.id; // Attach user ID to request object
    req.user = decoded; // Attach entire user data to request object

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.log("Error verifying token:", err);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = { handleValidUser };
