const hashPassword = require("../utils/hashPassword");
const error = require("../utils/error");
const userService = require("../services/user");

// * get single user
const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("user not found!", 400);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// * create a new user by admin
const postUser = async (req, res, next) => {
  const { name, email, password, role = "user" } = req.body;

  const hash = await hashPassword(password);

  try {
    const user = await userService.createNewUser(name, email, hash, role);

    res.status(200).json({
      message: "user created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
