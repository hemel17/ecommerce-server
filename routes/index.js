const router = require("express").Router();
const authRoutes = require("./auth");

// * auth routes
router.use("/api/auth", authRoutes);

module.exports = router;
