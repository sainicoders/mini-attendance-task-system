const { Attendance } = require("../models");
const AppError = require("../utils/AppError");

exports.checkIn = async (userId) => {
  const today = new Date().toISOString().slice(0, 10);

  const exists = await Attendance.findOne({
    where: { UserId: userId, date: today },
  });

  if (exists)
    throw new AppError("Attendance already marked for today", 400);

  return Attendance.create({
    date: today,
    check_in_time: new Date().toLocaleTimeString(),
    UserId: userId,
  });
};
