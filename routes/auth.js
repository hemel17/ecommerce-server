const router = require("express").Router();
const authController = require("../controllers/auth");
const authenticate = require("../middlewares/authenticate");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/check-auth", authenticate, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
