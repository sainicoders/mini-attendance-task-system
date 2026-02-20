const Joi = require("joi");

exports.createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
});

exports.updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid("pending", "completed"),
});
