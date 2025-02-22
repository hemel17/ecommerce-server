const authService = require("../services/auth");

// * Register
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: name, email, and password",
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

// * Login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const { token, payload } = await authService.loginService(email, password);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
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

// * Logout
const logout = (_req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Successfully logged out!",
  });
};

// * Check Authentication
const checkAuth = (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
};

module.exports = { register, login, logout, checkAuth };
