import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/db.js';
import authRouter from './routes/auth.routes.js';

dotenv.config();

const app = express();

//built-in middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//MongoDB Database Connection
connectMongoDB();

//Auth Routes
app.use('/api/auth', authRouter);

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}`);
});