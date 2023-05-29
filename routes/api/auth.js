const express = require("express");
const router = express.Router();

const { register, login } = require("../../controllers");
const { validateBody, isBody } = require("../../middlewares");
const { userRegisterSchema, userLoginSchema } = require("../../schemas");

router.post("/register", isBody, validateBody(userRegisterSchema), register);
router.post("/login", isBody, validateBody(userLoginSchema), login);

module.exports = router;
