const express = require("express");
const router = express.Router();

const { getChapter } = require("../controllers/bibleController");

router.get("/:language/:book/:chapter", getChapter);

module.exports = router;