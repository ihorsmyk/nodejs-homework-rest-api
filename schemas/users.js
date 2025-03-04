const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).max(30).required(),
  subscription: Joi.string(),
});

const userloginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).max(30).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  userRegisterSchema,
  userloginSchema,
  emailSchema,
};
