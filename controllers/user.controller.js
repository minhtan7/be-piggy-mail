const User = require("../models/User");
const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new Error("401 - Email already exits"));
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await new User({ name, email, password });
    await user.save();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "Created new account"
    );
  } catch (err) {
    next(err);
  }
};

const getMessagesOfUser = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user) return next(new Error("404 - User not found"));
    let messages;
    if (user.role !== "admin") {
      messages = await Message.find({ to: userId })
        .populate("from")
        .sort("-createdAt");
    } else if (user.role === "admin") {
      messages = await Message.find()
        .populate("from")
        .populate("to")
        .sort("-createdAt");
    }

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { messages },
      null,
      "Get messages success"
    );
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const user = await User.findById(currentUserId);
    if (!user) return next(new Error("401 - User not found"));
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "Get current user success"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getMessagesOfUser,
  getCurrentUser,
};
