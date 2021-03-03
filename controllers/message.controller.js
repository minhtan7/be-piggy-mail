const Message = require("../models/Message");
const utilsHelper = require("../helpers/utils.helper");
const User = require("../models/User");
const { findOneAndUpdate } = require("../models/User");

const sendMessage = async (req, res, next) => {
  try {
    let { to, title, body } = req.body;
    let userId = req.userId;
    console.log(userId);

    let receiver = await User.findOne({ email: to });

    if (!receiver) return next(new Error("404 - User not defined"));
    console.log(receiver);
    const message = await new Message({
      from: userId,
      to: receiver._id,
      title,
      body,
      status: "unseen",
      isDelete: false,
    });
    await message.save();
    utilsHelper.sendResponse(res, 200, true, { message }, null, "Sent message");
  } catch (err) {
    next(err);
  }
};

const getListOfMessage = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalMessages = await Message.countDocuments();
    const totalPages = Math.ceil(totalMessages / limit);
    const offset = limit * (page - 1);

    const messages = await Message.find({})
      .skip(offset)
      .limit(limit)
      .populate("from")
      .populate("to");
    if (!messages)
      return next(
        utilsHelper.sendResponse(
          res,
          200,
          true,
          null,
          null,
          "You haven't sent anything yet"
        )
      );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { messages, totalPages },
      null,
      "List of messages"
    );
  } catch (err) {
    next(err);
  }
};

const getSingleMessage = async (req, res, next) => {
  try {
    const msgId = req.params.id;
    console.log(msgId);
    let message = await Message.findById(msgId);
    if (!message) return next(new Error("404 - Message not found"));
    message = await Message.findById(msgId)
      .populate("from", "+ name email")
      .populate("to", "+ name email");
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { message },
      null,
      "Get single message"
    );
  } catch (err) {
    next(err);
  }
};

const updateMessage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const message = req.body;
    if (!message) return next(new Error("404 - Message not found"));
    const updateMessage = findOneAndUpdate(
      { _id: message._id },
      { ...message },
      { new: true }
    );
    if (!updateMessage) return next(new Error("404 - Message not found"));
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { updateMessage },
      null,
      "Successfully updating massage!"
    );
  } catch (err) {
    next(err);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
module.exports = {
  sendMessage,
  getListOfMessage,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};
