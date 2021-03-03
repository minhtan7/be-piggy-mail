const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @route api/auth/login
 * @description User can login with email and password
 * @access Public
 */
router.post("/login", authController.login);

module.exports = router;
