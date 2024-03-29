const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");

// Define the User model
const User = sequelize.define(
  "User", // Model name
  {
    // Define model attributes
    userId: {
      type: DataTypes.INTEGER, // Data type is Integer
      autoIncrement: true, // Auto-incrementing primary key
      primaryKey: true, // Primary key
    },
    name: {
      type: DataTypes.STRING, // Data type is String
      allowNull: false, // Not nullable
    },
    PhoneNumber: {
      type: DataTypes.STRING, // Data type is String
      unique: true, // Unique constraint
      allowNull: false, // Not nullable
    },
    password: {
      type: DataTypes.STRING, // Data type is String
      allowNull: false, // Not nullable
    },
    email: {
      type: DataTypes.STRING, // Data type is String
      allowNull: true, // Nullable
    },
  },
  {
    // Define additional options
    tableName: "Users", // Specify the table name
    timestamps: false, // Disable timestamps
  }
);

// Export the User model
module.exports = User;
