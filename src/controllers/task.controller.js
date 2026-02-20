const service = require("../services/task.service");

exports.create = async (req, res) => {
  const task = await service.create(req.body, req.user.id);
  res.json(task);
};

exports.update = async (req, res) => {
  await service.update(req.params.id, req.body, req.user.id);
  res.json({ message: "Task updated" });
};

exports.list = async (req, res) => {
  res.json(await service.list(req.user.id));
};
