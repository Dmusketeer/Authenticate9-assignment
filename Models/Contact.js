const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
const User = require("./User");

// Define the Contacts model
const Contacts = sequelize.define(
  "Contacts", // Model name
  {
    // Define model attributes
    isContactOf: {
      type: DataTypes.INTEGER, // Data type is Integer
      primaryKey: false, // Not a primary key
      references: {
        model: User, // Reference to the User model
        key: "userId", // Column name of the referenced model
      },
    },
    name: {
      type: DataTypes.STRING, // Data type is String
      allowNull: false, // Not nullable
      primaryKey: false, // Not a primary key
    },
    PhoneNumber: {
      type: DataTypes.STRING, // Data type is String
      allowNull: false, // Not nullable
      primaryKey: false, // Not a primary key
    },
    email: {
      type: DataTypes.STRING, // Data type is String
      allowNull: true, // Nullable
      primaryKey: false, // Not a primary key
    },
  },
  {
    // Define additional options
    tableName: "contacts", // Specify the table name
    timestamps: false, // Disable timestamps
    id: false, // Disable id column
    indexes: [
      // Define indexes
      {
        unique: true, // Ensure uniqueness
        fields: ["isContactOf", "phoneNumber"], // Specify indexed fields
      },
    ],
  }
);

// Remove the id attribute
Contacts.removeAttribute("id");

// Export the Contacts model
module.exports = Contacts;
