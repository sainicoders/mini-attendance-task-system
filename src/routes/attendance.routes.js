const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/attendance.controller");

router.post("/check-in", auth, controller.checkIn);

module.exports = router;
