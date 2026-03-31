import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EMAIL_USER, EMAIL_PASS } from "../config/env.js";
dotenv.config();

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS, // App password (not normal password)
      },
    });

    await transporter.sendMail({
      from: `"Auth System" <${EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    // throw new Error("Email sending failed");
  }
};

export default sendEmail;