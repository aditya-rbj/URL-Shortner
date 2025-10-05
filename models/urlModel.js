const pool = require("../db");

const generateShortUrl = async (originalUrl, shortCode) => {
  const result = await pool.query(
    "insert into urls (original_url,short_code) values ($1,$2) returning *",
    [originalUrl, shortCode]
  );
  return result.rows[0];
};

const getOriginalUrl = async (shortCode) => {
  const result = await pool.query(
    "select original_url from urls where short_code = $1",
    [shortCode]
  );
  return result.rows[0].original_url;
};

const getAllUrls = async () => {
  const result = await pool.query("select * from urls");
  return result.rows;
};

module.exports = { generateShortUrl, getOriginalUrl, getAllUrls };
