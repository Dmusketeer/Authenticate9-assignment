const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
const User = require("./User");

// Define the SpamNumber model
const SpamNumber = sequelize.define(
  "SpamNumber", // Model name
  {
    // Define model attributes
    addedBy: {
      type: DataTypes.INTEGER, // Data type is Integer
      primaryKey: false, // Not a primary key
      references: {
        model: User, // Reference to the User model
        key: "userId", // Column name of the referenced model
      },
    },
    PhoneNumber: {
      type: DataTypes.STRING, // Data type is String
      primaryKey: false, // Not a primary key
      allowNull: false, // Not nullable
    },
  },
  {
    // Define additional options
    tableName: "spamNumbers", // Specify the table name
    timestamps: false, // Disable timestamps
    id: false, // Disable id column
  }
);

// Remove the id attribute
SpamNumber.removeAttribute("id");

// Export the SpamNumber model
module.exports = SpamNumber;
