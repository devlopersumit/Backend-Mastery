import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/db.js';

dotenv.config();

const app = express();

//MongoDB database Connection
connectMongoDB();

// Welcome Route
app.get('/', (req, res) => {
    res.send("Welcome to the Multi-Tenant Notes App server");
} );

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}`);
});