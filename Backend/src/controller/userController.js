import userSchema from "../models/userSchema.js";
import sessionSchema from "../models/sessionSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyEmail } from "../verifyEmail/verifyEmail.js";
import { access } from "fs";

dotenv.config();

export const registerUser = async (req, res) => {
  const { fullName, userName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role || !userName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email is already registered with us" });
    }

    const existingUserName = await userSchema.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const newUser = new userSchema({
      fullName,
      userName,
      email,

      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.secretKey, {
      expiresIn: "15m",
    });

    verifyEmail(token, email, fullName, userName, password, role);
    newUser.token = token;
    newUser.isVerified = false;
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      
      user: {
        data: {
          fullName: newUser.fullName,
          userName: newUser.userName,
          email: newUser.email,
          role: newUser.role,
          isVerified: newUser.isVerified,
          profilePicture: newUser.profilePicture,
          token: newUser.token,
        },
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
    }

    await sessionSchema.deleteMany({ userId: user._id });

    const accessToken = jwt.sign({ id: user._id }, process.env.secretKey, {
      expiresIn: "10days",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.secretKey, {
      expiresIn: "30days",
    });

    const session = new sessionSchema({
      userId: user._id,
      accessToken,
      refreshToken,
    });
    await session.save();

    user.isLoggedIn = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        data: {
          fullName: user.fullName,
          userName: user.userName,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          profilePicture: user.profilePicture,
          accessToken,
          refreshToken,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
 const {email} = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isLoggedIn) {
      return res.status(400).json({ message: "User is not logged in" });
    }

    await sessionSchema.deleteMany({ userId: user._id });

    user.isLoggedIn = false;
    await user.save();

    res.status(200).json({
      success: true,
       message: "Logout successful" ,
      
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error: error.message });
  }
}