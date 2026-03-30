import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  // Implement signup logic here
  const genSaltRounds = 10;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    // Your signup logic here
    const { name, email, password } = req.body;
    //check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email: normalizedEmail }).session(
      session,
    );
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // Password validation can be added here (e.g., minimum length, complexity requirements)
    const validatePassword = (password, email) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!regex.test(password)) {
        return "Weak password format";
      }

      if (password.toLowerCase().includes(email.toLowerCase())) {
        return "Password should not contain email";
      }

      if (/(.)\1\1/.test(password)) {
        return "Too many repeated characters";
      }

      return null; // valid
    };

    const passwordError = validatePassword(password, normalizedEmail);

    if (passwordError) {
      return res.status(400).json({
        success: false,
        message: passwordError,
      });
    }
    //password hashing and other operations can be done here before creating the user
    const hashedPassword = await bcrypt.hash(password, genSaltRounds);
    // Create the User
    const newUser = await User.create(
      [{ name, email: normalizedEmail, password: hashedPassword }],
      { session },
    );
    // Creating payload for JWT token
    const payload = {
      id: newUser[0]._id,
      email: newUser[0].email,
      name: newUser[0].name,
    };
    //Creating token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    // Commit the transaction
    await session.commitTransaction();
    //send response to client
    res.status(201).json({
      success: true,
      message: "User Created successfully",
      token: token,
    });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    next(error);
  } finally {
    await session.endSession();
  }
};





export const signIn = async (req, res, next) => {
  // Implement signIp logic here
};

export const signOut = async (req, res, next) => {
  // Implement signout logic here
};
