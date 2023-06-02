const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusById,
  removeById,
} = require("./contacts-controller");

const {
  register,
  login,
  getCurrentUser,
  logout,
} = require("./auth-controller");

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  updateStatusById,
  removeById,
  register,
  login,
  getCurrentUser,
  logout,
};
