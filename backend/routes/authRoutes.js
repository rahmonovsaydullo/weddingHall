const express = require("express");
const login = require("../controllers/auth/login");
const router = express.Router();


// POST /login
router.post("/login", login);

module.exports = router;
