const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getCurrentUser,
  logout,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("../../controllers");
const { validateBody, isBody, authenticate, upload } = require("../../middlewares");
const { userRegisterSchema, userloginSchema, emailSchema } = require("../../schemas");

router.post("/register", isBody, validateBody(userRegisterSchema), register);
router.post("/login", isBody, validateBody(userloginSchema), login);
router.post("/verify", validateBody(emailSchema), resendVerifyEmail)
router.patch("/avatars", authenticate, upload.single('avatar'), updateAvatar);
router.get("/current", authenticate, getCurrentUser);
router.get("/verify/:verificationToken", verify);
router.post("/logout", authenticate, logout);
 
module.exports = router;
