const authService = require("../services/auth.service");

exports.signup = async (req, res, next) => {
  try {
    await authService.signup(req.body);
    res.json({ success: true, message: "User registered" });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};