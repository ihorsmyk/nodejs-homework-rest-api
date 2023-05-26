const { validateBody } = require("./validateBody");
const { isBody } = require("./isBody");
const { handleMongooseError } = require("./handleMongooseError");
const { isValidId } = require("./isValidId");
const { isBodyFavorite } = require("./isBodyFavorite");

module.exports = {
  validateBody,
  isBody,
  handleMongooseError,
  isValidId,
  isBodyFavorite,
};
