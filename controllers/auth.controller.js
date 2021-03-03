const User = require("../models/User");
const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new Error("401 - Email or Password is wrong"));
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Error("401 - Email or Password is wrong"));
    const accessToken = await user.generateToken();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Login success"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
