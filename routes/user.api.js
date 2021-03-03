const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { loginRequired } = require("../middlewares/authentication");

/**
 * @route POST api/users
 * @description User can register for a new account
 * @access Public
 */
router.post("/", userController.register);

/**
 * @route GET api/users/me
 * @description User can return current user info
 * @access login required
 */
router.get("/me", loginRequired, userController.getCurrentUser);

/**
 * @route GET api/users/:id/messages
 * @description User can get list of messages sent to current user
 * @access login required
 */
router.get("/:id/messages", loginRequired, userController.getMessagesOfUser);

module.exports = router;
