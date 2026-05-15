const express = require("express");
const router = express.Router();

const { searchBible } = require("../controllers/searchController");

router.get("/", searchBible);

module.exports = router;
