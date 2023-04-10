const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

module.exports.createUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.status(401).json({
        success: false,
        message: "password and confirm_password should be matched",
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      user = await User.create(req.body);
    }
    return res.status(201).json({
      success: true,
      message: "User created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.authenticateUser = async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      let user = await User.findOne({ email: req.body.email });
      if (user && user.password === req.body.password) {
        return res.status(201).json({
          success: true,
          user: user,
          message: "successfully authenticated the user",
          jwt_token: jwt.sign(user.toJSON(), process.env.JWTSECRETKEY),
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getAuthenticatedUser = async (req, res) => {
  try {
    // get jwt token from request headers
    const token = req.headers.authorization?.split(" ")[1];
    // if token not exist
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token needed",
      });
    }
    // extract user from jwt token
    let user = jwt.verify(token, process.env.JWTSECRETKEY);

    return res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.editUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.status(401).json({
        success: false,
        message: "password and confirm_password should be matched",
      });
    }
    // get jwt token from request headers
    const token = req.headers.authorization?.split(" ")[1];
    // if token not exist
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token needed",
      });
    }
    // extract user from jwt token
    let user = jwt.verify(token, process.env.JWTSECRETKEY);
    if (user.email !== req.body.email) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    // find user
    user = await User.findOne({ email: req.body.email });
    // if user exist
    if (user) {
      user.name = req.body.name;
      user.password = req.body.password;
      await user.save();
      return res.status(201).json({
        success: true,
        message: "User edited !!",
        user: user,
        jwt_token: jwt.sign(user.toJSON(), process.env.JWTSECRETKEY),
      });
    }
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
