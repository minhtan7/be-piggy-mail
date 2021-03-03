const express = require("express");
const messageController = require("../controllers/message.controller");
const { loginRequired } = require("../middlewares/authentication");
const { login } = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @route POST api/messages
 * @description User can send message
 * @access login required
 */
router.post("/", loginRequired, messageController.sendMessage);
/**
 * @route PUT api/messages
 * @description User can update content of message
 * @access login required
 */
router.put("/", loginRequired, messageController.updateMessage);

/**
 * @route GET api/messages?page=1&limit=20
 * @description User can get list of messages with pagination
 * @access log in required
 */
router.get("/", loginRequired, messageController.getListOfMessage);

/**
 * @route GET api/messages/:id
 * @description User can see a message detail
 * @access Public
 */
router.get("/:id", loginRequired, messageController.getSingleMessage);

module.exports = router;
