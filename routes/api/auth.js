const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getCurrentUser,
  logout,
} = require("../../controllers");
const { validateBody, isBody, authenticate } = require("../../middlewares");
const { userRegisterSchema, userloginSchema } = require("../../schemas");

router.post("/register", isBody, validateBody(userRegisterSchema), register);
router.post("/login", isBody, validateBody(userloginSchema), login);
router.get("/current", authenticate, getCurrentUser);
router.post("/logout", authenticate, logout);

module.exports = router;
