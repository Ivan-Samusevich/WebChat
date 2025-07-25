import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "1234567",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "1234568",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "1234569",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  }
];

const seedDatabase = async () => {
    try {
      await connectDB(); 
  
      await User.bulkCreate(seedUsers, {
        validate: true // Проверять валидацию модели
      });
  
      console.log("Database seeded successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  };

// Call the function
seedDatabase();