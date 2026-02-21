const service = require("../services/attendance.service");


//  Check-In
exports.checkIn = async (req, res, next) => {
  try {
    await service.checkIn(req.user.id);

    res.status(200).json({
      success: true,
      message: "Checked in successfully",
    });
  } catch (err) {
    next(err);
  }
};


//  Check-Out
exports.checkOut = async (req, res, next) => {
  try {
    const data = await service.checkOut(req.user.id);

    res.status(200).json({
      success: true,
      message: "Checked out successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};


//  Get My Attendance List
exports.getMyAttendance = async (req, res, next) => {
  try {
    const data = await service.getMyAttendance(req.user.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};