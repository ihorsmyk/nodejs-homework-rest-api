const { validateBody } = require("./validateBody");
const { isBody } = require("./isBody");
const { handleMongooseError } = require("../helpers/handleMongooseError");
const { isValidId } = require("./isValidId");
const { isBodyFavorite } = require("./isBodyFavorite");
const { authenticate } = require("./authenticate");

module.exports = {
  validateBody,
  isBody,
  handleMongooseError,
  isValidId,
  isBodyFavorite,
  authenticate,
};
