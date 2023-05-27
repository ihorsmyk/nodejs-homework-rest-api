const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");
const { Contact } = require("../models");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(contact);
};

const updateStatusById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(contact);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusById: ctrlWrapper(updateStatusById),
  removeById: ctrlWrapper(removeById),
};
