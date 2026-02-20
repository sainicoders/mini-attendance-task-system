    const User = require("./User");
const Attendance = require("./Attendance");
const Task = require("./Task");

User.hasMany(Attendance);
Attendance.belongsTo(User);

User.hasMany(Task);
Task.belongsTo(User);

module.exports = { User, Attendance, Task };
