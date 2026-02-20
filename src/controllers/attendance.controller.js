const service = require("../services/attendance.service");

exports.checkIn = async (req, res, next) => {
  try {
    await service.checkIn(req.user.id);
    res.json({ success: true, message: "Attendance marked" });
  } catch (err) {
    next(err);
  }
};