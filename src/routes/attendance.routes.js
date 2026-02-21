const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/attendance.controller");

//  Check-In
router.post("/check-in", auth, controller.checkIn);

//  Check-Out
router.post("/check-out", auth, controller.checkOut);

// Get My Attendance List
router.get("/", auth, controller.getMyAttendance);

module.exports = router;