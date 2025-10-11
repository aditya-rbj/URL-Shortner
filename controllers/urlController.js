const {
  generateShortUrl,
  getOriginalUrl,
  getAllUrls,
} = require("../models/urlModel");
const shortid = require("shortid");

const handleUrlShortening = async (req, res) => {
  const { originalUrl } = req.body;
  //   const user = req.user; // ✅ Use the verified user from middleware
  //   if (!user) {
  //     res.status(401).json({ message: "Unauthorized: No user ID found" });
  //     return;
  //   }
  if (!originalUrl) {
    res.status(400).json({ message: "Original URL is required" });
    return;
  }
  // Validate URL format
  try {
    const shortCode = shortid();
    const result = await generateShortUrl(originalUrl, shortCode);
    res
      .status(201)
      .json({ shortUrl: `${req.headers.host}/${result.short_code}` });
  } catch (err) {
    console.error("Error generating short URL:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleUrlRedirect = async (req, res) => {
  const { shortCode } = req.params;
  //   const user = req.user; // ✅ Use the verified user from middleware
  //   if (!user) {
  //     res.status(401).json({ message: "Unauthorized: No user ID found" });
  //     return;
  //   }
  if (!shortCode) {
    res.status(400).json({ message: "Short code is required" });
    return;
  }
  try {
    const result = await getOriginalUrl(shortCode);
    res.redirect(result);
  } catch (err) {
    console.error("Error redirecting to original URL:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleAllUrls = async (req, res) => {
  //   const user = req.user; // ✅ Use the verified user from middleware
  //   if (!user) {
  //     res.status(401).json({ message: "Unauthorized: No user ID found" });
  //     return;
  //   }
  try {
    const result = await getAllUrls();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching all URLs:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { handleUrlShortening, handleUrlRedirect, handleAllUrls };
