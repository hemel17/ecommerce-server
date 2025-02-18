const authService = require("../services/auth");

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
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// * login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Invalid credentials!",
    });
  }

  try {
    const { token, payload } = await authService.loginService(email, password);

    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: payload,
      });
  } catch (error) {
    next(error);
  }
};

// todo : logout
const logout = async (_req, res, next) => {
  try {
    res.clearCookie("token").json({
      message: "Successfully logged out!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout };
