const express = require("express");
// const pool = require("./db");

const urlRouter = require("./routers/urlRoute");

const app = express();

app.use(express.json());

app.use("/", urlRouter);

// Test Db connection
// (async () => {
//   try {
//     const res = await pool.query("SELECT NOW()");
//     console.log("Database connected successfully at:", res.rows[0].now);
//   } catch (err) {
//     console.error("Database connection error:", err.stack);
//   }
// })();

app.listen(8000, () => {
  console.log("Server has started");
});
