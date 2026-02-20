const { Task } = require("../models");
const AppError = require("../utils/AppError");

exports.create = async (data, userId) => {
  return await Task.create({ ...data, UserId: userId });
};

exports.update = async (id, data, userId) => {
  const task = await Task.findOne({
    where: { id, UserId: userId },
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  await task.update(data);
  return task;
};

exports.list = async (userId) => {
  return await Task.findAll({
    where: { UserId: userId },
  });
};