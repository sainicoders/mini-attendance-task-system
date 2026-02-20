const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const authValidation = require("../validations/auth.validation");

router.post(
  "/signup",
  validate(authValidation.signupSchema),
  controller.signup
);

router.post(
  "/login",
  validate(authValidation.loginSchema),
  controller.login
);

module.exports = router;
