const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const { sequelize } = require("./config/config.js");

sequelize
  .sync()
  .then(() => {
    console.log("Database Connected sucessfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
