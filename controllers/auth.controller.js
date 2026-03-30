import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import dotenv from "dotenv";
dotenv.config();
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
    // name and email can also be validated here (e.g., check for valid email format, name length, etc.)
    const validateEmail = (email) => {
      const normalizedEmail = email.trim().toLowerCase();

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!regex.test(normalizedEmail)) {
        return "Invalid email format";
      }

      if (normalizedEmail.includes("..")) {
        return "Email cannot contain consecutive dots";
      }

      const blockedDomains = ["tempmail.com", "mailinator.com"];
      const domain = normalizedEmail.split("@")[1];

      if (blockedDomains.includes(domain)) {
        return "Disposable emails are not allowed";
      }

      return null;
    };
    const emailError = validateEmail(email);

    if (emailError) {
      return res.status(400).json({
        success: false,
        message: emailError,
      });
    }
    // Name validation
    const validateName = (name) => {
      const trimmedName = name.trim();

      // Length check
      if (trimmedName.length < 2 || trimmedName.length > 50) {
        return "Name must be between 2 and 50 characters";
      }

      // Only letters and spaces
      if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
        return "Name can only contain letters and spaces";
      }

      // No multiple spaces
      if (/\s{2,}/.test(trimmedName)) {
        return "Name cannot contain multiple consecutive spaces";
      }

      return null; // valid
    };
    const nameError = validateName(name);

    if (nameError) {
      return res.status(400).json({
        success: false,
        message: nameError,
      });
    }
    // Create the User
    const newUser = await User.create(
      [{ name: name, email: normalizedEmail, password: hashedPassword }],
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
  try {
    let { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🔥 Check account lock BEFORE password check
    if (user.failedLoginAttempts >= 5) {
      return res.status(403).json({
        success: false,
        message: "Account locked. Try again later",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //  Reset attempts AFTER successful login
    user.failedLoginAttempts = 0;
    user.lastLogin = new Date();
    await user.save();

    // JWT
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure:  true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
    });

  } catch (error) {
    next(error);
  }
};
export const signOut = async (req, res, next) => {
  // Implement signout logic here
  try {
     res.clearCookie("token",{
        httpOnly : true ,
        secure : true,
        sameSite : "Strict"
     });

     return res.status(200).json({
        success : true ,
        message : "Logout Successfully!"
     })
  } catch (error) {
    next(error);
  }

};
