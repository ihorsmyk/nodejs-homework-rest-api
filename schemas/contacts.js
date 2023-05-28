const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(2).max(12).required(),
  favorite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  updateStatusSchema,
};
