const { Task } = require("../models");
const AppError = require("../utils/AppError");

exports.create = async (data, userId) => {
  if (!data.title || data.title.trim() === "") {
    throw new AppError("Task title is required", 400);
  }

  return await Task.create({
    title: data.title,
    description: data.description || null,
    UserId: userId,
  });
};

exports.update = async (id, data, userId) => {
  const task = await Task.findOne({
    where: { id, UserId: userId },
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (data.status && !["pending", "completed"].includes(data.status)) {
    throw new AppError("Invalid status value", 400);
  }

  await task.update(data);
  return task;
};

exports.list = async (userId) => {
  return await Task.findAll({
    where: { UserId: userId },
    order: [["createdAt", "DESC"]],
  });
};