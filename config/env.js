import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARJECT_KEY,
  ARJECT_ENV,
  EMAIL_USER,
  EMAIL_PASS
} = process.env;
