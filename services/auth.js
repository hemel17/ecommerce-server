require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("./user");
const hashPassword = require("../utils/hashPassword");
const error = require("../utils/error");

const registerService = async (name, email, password) => {
  const user = await userService.findUserByProperty("email", email);

  if (user) {
    throw error("User already exists!", 400);
  }

  const hash = await hashPassword(password);

  return userService.createNewUser(name, email, hash);
};

const loginService = async (email, password) => {
  const user = await userService.findUserByProperty("email", email);

  if (!user) {
    throw error("No account found!", 400);
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw error("Password is incorrect!");
  }

  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2h" });

  return { token, payload };
};

module.exports = { registerService, loginService };
