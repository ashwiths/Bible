const express = require("express");
const router = express.Router();
const { getVerseOfTheDay } = require("../controllers/votdController");

router.get("/", getVerseOfTheDay);

module.exports = router;
