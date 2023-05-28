const { HttpError } = require("../helpers");

const isBody = (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  if (!name && !email && !phone && !favorite) {
    next(HttpError(400, "missing fields"));
  }
  next();
};

module.exports = {
  isBody,
};
