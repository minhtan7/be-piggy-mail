var express = require("express");
var router = express.Router();

//message API
const messageAPI = require("./message.api");
router.use("/messages", messageAPI);

//userAPI
const userAPI = require("./user.api");
router.use("/users", userAPI);

//authAPI
const authAPI = require("./auth.api");
router.use("/auth", authAPI);

module.exports = router;
