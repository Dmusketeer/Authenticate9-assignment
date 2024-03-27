const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_HOST);

module.exports = { sequelize };
