const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");
const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(contacts);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const contact = await Contact.findOne({ _id: id, owner });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(contact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });
  res.status(201).json(contact);
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.updateOne({ _id: id, owner }, req.body, {
    new: true,
  });
  if (!result.modifiedCount === 0) {
    throw HttpError(404, "Not found");
  }
  const contact = await Contact.findById(id);
  res.status(201).json(contact);
};

const updateStatusById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.updateOne({ _id: id, owner }, req.body, {
    new: true,
  });
  if (!result.modifiedCount === 0) {
    throw HttpError(404, "Not found");
  }
  const contact = await Contact.findById(id);
  res.status(201).json(contact);
};

const removeById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.deleteOne({ _id: id, owner });
  if (!result.deletedCount === 0) {
    throw HttpError(404, `Contact with id ${id} not found`);
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
