const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const AppError = require("../utils/AppError");

exports.signup = async (data) => {
  const exists = await User.findOne({ where: { email: data.email } });
  if (exists) throw new AppError("Email already exists", 400);

  const hash = await bcrypt.hash(data.password, 10);
  return User.create({
    name: data.name,
    email: data.email,
    password_hash: hash,
  });
};

exports.login = async (data) => {
  const user = await User.findOne({ where: { email: data.email } });
  if (!user) throw new AppError("Invalid credentials", 401);

  const match = await bcrypt.compare(data.password, user.password_hash);
  if (!match) throw new AppError("Invalid credentials", 401);

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};
