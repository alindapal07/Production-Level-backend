import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authorize =async (req,res,next )=>{
  try {
    const token =req.cookies.token || req.headers.authorization?.split(" ")[1]; //check both  cookies and headers fro token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }
    // Verify the token (implement your token verification logic here)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attacth decoded user info to request object for use in next middlewares or controllers
    next();
  } catch (error) {
    next(error);
  }
}