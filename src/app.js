const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/attendance", require("./routes/attendance.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

// ✅ Error handler MUST be last
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

module.exports = app;