require("dotenv").config();
const error = require("../utils/error");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

module.exports = authenticate;
