const { HttpError } = require("../helpers");

const isBodyFavorite = (req, res, next) => {
  const { favorite } = req.body;
  if (favorite === null) {
    next(HttpError(400, "missing field favorite"));
  }
  next();
};
module.exports = {
  isBodyFavorite,
};
