const authService = require("../services/auth");

// todo : login

// * register
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Invalid credentials!",
    });
  }

  try {
    const user = await authService.registerService(name, email, password);
    res.status(201).json({
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// todo : logout

module.exports = { register };
