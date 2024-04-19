const express = require("express"); // Express framework
const User = require("../Models/User"); // User model
const bcrypt = require("bcryptjs"); // Bcrypt for password hashing
const { Sequelize } = require("sequelize");
const secretKey = process.env.TOKEN_SECRET; // Controller function for user registration
const jwt = require("jsonwebtoken");
// Controller function for user registration
exports.register = async (req, res) => {
  const { name, phoneNumber, password } = req.body; // Extract data from request body
  // Check if required fields are provided
  if (!(name && phoneNumber && password)) {
    return res
      .status(400)
      .json({ error: "Invalid Request. Required fields not provided" });
  }
  try {
    // Check if the phone number already exists
    const existingUser = await User.findOne({
      where: { PhoneNumber: phoneNumber },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Phone Number already added by a registered user" });
    }
    // User registration if phone number doesn't exist
    var email = req.body.email || null; // Extract email from request body
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = await User.create({
      name: name,
      PhoneNumber: phoneNumber,
      password: hashedPassword,
      email: email,
    }); // Create and save new user
    return res.json({ message: "User Registered Successfully" }); // Send success response
  } catch (error) {
    console.error("Database error during user creation:", error); // Log database error to console
    return res
      .status(500)
      .json({ error: "Issue occurred during user creation" }); // Send error response
  }
};

// Controller function for user login
exports.login = async (req, res) => {
  const { name, password } = req.body; // Extract data from request body

  // Check if required fields are provided
  if (!(name && password)) {
    return res
      .status(400)
      .json({ err: "Invalid Request. Required fields not provided" });
  }

  try {
    // Find user by name
    const user = await User.findOne({ where: { name: name } });

    // Check if user exists
    if (!user) {
      return res
        .status(400)
        .json({ err: "Invalid username/password provided" }); // Send error response for invalid username
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Generate JWT token
      const token = jwt.sign({ userId: user.userId }, secretKey, {
        expiresIn: "1h",
      });
      return res.json({
        message: "Login Successful",
        token,
      }); // Send success response
    } else {
      return res
        .status(400)
        .json({ err: "Invalid username/password provided" }); // Send error response for invalid password
    }
  } catch (error) {
    return res.status(500).json({ err: "Internal Server Error" }); // Send error response for internal server error
  }
};

// Controller function for fetching all users
exports.allUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from database
    res.status(200).json(users); // Send success response with users data
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
};
