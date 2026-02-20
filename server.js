require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/db");

(async () => {
  try {
    await sequelize.authenticate();
    console.log(" Database connected");

    await sequelize.sync();
    console.log(" Models synced");

    app.listen(process.env.PORT, () => {
      console.log(` Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(" Unable to start server:", error.message);
    process.exit(1);
  }
})();
