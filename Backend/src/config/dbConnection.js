import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.url;

export async function dbConnection() {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
  }
}
