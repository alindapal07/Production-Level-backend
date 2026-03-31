import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cors from 'cors';
import arjectMiddleware from './middleware/arject.middleware.js';

// ✅ Create Express app
const app = express();
app.use(cors());
app.use(arjectMiddleware);
// const PORT =  5000;

// ✅ Middleware
app.use(morgan('dev')); // Logging middleware
app.use(express.json()); // Body parsing middleware for JSON
app.use(cookieParser()); // Cookie parsing middleware




// ✅ Routes from outside files
app.use('/api/V1/auth',authRouter);
app.use('/api/V1/users',userRouter);
app.use('/api/V1/subscriptions',subscriptionRouter);

app.use(errorMiddleware); // Error handling middleware

// ✅ Routes
app.get('/', (req, res) => {
    console.log('GET / request received, The app is running perfectly 🚀');
  res.send('🚀 Backend is running perfectly');
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}}`);
    await connectDB();

});
