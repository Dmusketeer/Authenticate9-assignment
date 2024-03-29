const { sequelize } = require("./config.js");
const User = require("../Models/User");
const Contact = require("../Models/Contact");
const Spam = require("../Models/Spam");
// Function to generate random sample data
const generateRandomData = async () => {
  try {
    // Create users
    const users = await User.bulkCreate([
      {
        name: "Dheeraj",
        PhoneNumber: "232734894",
        password: "3dv2312cv@",
        email: "@gmail.com",
      },

      {
        name: "Ram",
        PhoneNumber: "7325734894",
        password: "3dv2312cv#",
        email: "@gmail.com",
      },

      {
        name: "Ravi",
        PhoneNumber: "992734894",
        password: "1213",
        email: "@gmail.com",
      },

      {
        name: "Prakhar",
        PhoneNumber: "62734894",
        password: "8794958",
        email: "@gmail.com",
      },

      {
        name: "Dinesh",
        PhoneNumber: "03212734894",
        password: "dkfhdsj",
        email: "@gmail.com",
      },
    ]);

    // Create contacts for each user
    for (const user of users) {
      const contacts = [];
      for (let i = 0; i < 10; i++) {
        // Generate 10 random contacts for each user
        contacts.push({
          userId: user.id,
          name: `Contact ${i + 1}`,
          phoneNumber: `123456789${i}`,
          email: `contact${i + 1}@gmail.com`,
        });
      }
      await Contact.bulkCreate(contacts);
    }

    // Create spam numbers
    const spamNumbers = [];
    for (let i = 0; i < 20; i++) {
      // Generate 20 random spam numbers
      spamNumbers.push({
        addedBy: users[Math.floor(Math.random() * users.length)].id,
        UserPhoneNumber: `987654567${i}`,
      });
    }
    await Spam.bulkCreate(spamNumbers);

    console.log("Data population completed successfully.");
  } catch (error) {
    console.error("Error populating data:", error);
  } finally {
    await sequelize.close(); // Close the database connection
  }
};

// Execute the data generation function
module.exports = generateRandomData;
