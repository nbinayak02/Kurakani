const express = require("express");
const { handleGetUserById } = require("../controllers/User");
const { getLastMessages } = require("../controllers/Chat");
const router = express.Router();

router.get("/user", handleGetUserById);
router.get("/", getLastMessages);

module.exports = router;
