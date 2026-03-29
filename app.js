import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './database/mongodb.js';

const app = express();
// const PORT =  5000;

// ✅ Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());



// ✅ Routes from outside files
app.use('/api/V1/auth',authRouter);
app.use('/api/V1/users',userRouter);
app.use('/api/V1/subscriptions',subscriptionRouter);

// ✅ Routes
app.get('/', (req, res) => {
    console.log('GET / request received, The app is running perfectly 🚀');
  res.send('🚀 Backend is running perfectly');
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}}`);
    await connectDB();

});
