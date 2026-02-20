const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const controller = require("../controllers/task.controller");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validations/task.validation");

router.post("/", auth, validate(createTaskSchema), controller.create);
router.patch("/:id", auth, validate(updateTaskSchema), controller.update);
router.get("/", auth, controller.list);

module.exports = router;
