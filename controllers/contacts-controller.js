const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");
const Contact = require("../models/contact");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  // const contact = await Contact.findOne({ name: "Igor Smyk" });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

// const updateById = async (req, res) => {
//   const { id } = req.params;

//   const { name, email, phone } = req.body;
//   const contact = await contactsService.updateContact(id, {
//     name,
//     email,
//     phone,
//   });
//   if (!contact) {
//     throw HttpError(404);
//   }
//   res.json(contact);
// };

// const removeById = async (req, res) => {
//   const { id } = req.params;
//   const contact = await contactsService.removeContact(id);
//   if (!contact) {
//     throw HttpError(404);
//   }
//   res.json(contact);
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  // update: ctrlWrapper(updateById),
  // removeById: ctrlWrapper(removeById),
};
