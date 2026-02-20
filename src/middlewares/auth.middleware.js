const jwt = require("jsonwebtoken");
const { User } = require("../models");
const AppError = require("../utils/AppError");

module.exports = async (req, res, next) => {
  try {
    // 1️⃣ Check Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized - Token missing", 401);
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Check if user exists
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // 5️⃣ Attach user to request
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};