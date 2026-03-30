import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 5,
      maxlength: 255,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      maxlength: 1024,
      select: false, // 🔥 VERY IMPORTANT (hide password)
    },

    // 🔐 Security fields
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
    },

    lastLogin: {
      type: Date,
    },

    // 👤 Role-based system (future)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    //  Email verification (future use)
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model("User", userSchema);
export default User;