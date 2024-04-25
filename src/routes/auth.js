const { Router } = require("express");

const { AuthMiddleware } = require("../middleware");
const {
  getUser,
  login,
  logout,
  register,
} = require("../controllers/AuthController");
const { LoginRequest, RegisterRequest } = require("../requests/auth");
const router = Router();

router.post("/login", LoginRequest, login);
router.post("/register", RegisterRequest, register);
router.get("/user", AuthMiddleware, getUser);
router.get("/logout", AuthMiddleware, logout);

module.exports = router;
