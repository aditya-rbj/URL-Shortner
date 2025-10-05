const express = require("express");
const {
  handleUrlShortening,
  handleUrlRedirect,
  handleAllUrls,
} = require("../controllers/urlController.js");

const router = express.Router();

router.post("/shorten", handleUrlShortening);
router.get("/allUrls", handleAllUrls);
router.get("/:shortCode", handleUrlRedirect);

module.exports = router;
