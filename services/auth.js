const User = require("../models/User");
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

module.exports = { registerService };
