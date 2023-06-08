const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;

const avatarsDir = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    throw HttpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompareResult = await bcrypt.compare(password, user.password);
  if (!passwordCompareResult) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;
  const resultDir = path.join(avatarsDir, originalname);
  const image = await Jimp.read(tempDir);
  await image.resize(250, 250).write(tempDir);
  await fs.rename(tempDir, resultDir);
  const avatarURL = path.join("avatars", originalname);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

const getCurrentUser = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({
    email,
    subscription,
    avatarURL,
  });
};

const logout = async (req, res) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).json();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
