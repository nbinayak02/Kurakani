const express = require("express")
const router = express.Router()
const { handleLogin, handleSignup } = require("../controllers/User")

router.post("/login", handleLogin);
router.post("/signup", handleSignup);

module.exports = router;