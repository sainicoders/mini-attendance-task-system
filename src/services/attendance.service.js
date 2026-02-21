const { Attendance } = require("../models");
const AppError = require("../utils/AppError");

exports.checkIn = async (userId) => {
  const today = new Date().toISOString().split("T")[0];

  const existing = await Attendance.findOne({
    where: { UserId: userId, date: today },
  });

  if (existing) {
    throw new AppError("Already checked in today", 400);
  }

  return Attendance.create({
    date: today,
    check_in_time: new Date(),  // ✅ store full timestamp
    UserId: userId,
  });
};
exports.checkOut = async (userId) => {
  const today = new Date().toISOString().split("T")[0];

  const attendance = await Attendance.findOne({
    where: { UserId: userId, date: today },
  });

  if (!attendance) {
    throw new AppError("Please check in first", 400);
  }

  if (attendance.check_out_time) {
    throw new AppError("Already checked out today", 400);
  }

  const now = new Date();
  attendance.check_out_time = now;

  const durationMs = now - attendance.check_in_time;
  const hours = (durationMs / (1000 * 60 * 60)).toFixed(2);

  await attendance.save();

  return {
    ...attendance.toJSON(),
    working_hours: hours,
  };
};


exports.getMyAttendance = async (userId) => {
  const records = await Attendance.findAll({
    where: { UserId: userId },
    order: [["date", "DESC"]],
  });

  // Add working hours calculation
  const formatted = records.map((record) => {
    let workingHours = null;

    if (record.check_in_time && record.check_out_time) {
      const durationMs =
        new Date(record.check_out_time) - new Date(record.check_in_time);

      workingHours = (durationMs / (1000 * 60 * 60)).toFixed(2); // hours
    }

    return {
      id: record.id,
      date: record.date,
      check_in_time: record.check_in_time,
      check_out_time: record.check_out_time,
      working_hours: workingHours,
    };
  });

  return formatted;
};