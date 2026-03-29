import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';

const app = express();
// const PORT =  5000;

// ✅ Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.get('/', (req, res) => {
    console.log('GET / request received, The app is running perfectly 🚀');
  res.send('🚀 Backend is running perfectly');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}}`);
});
