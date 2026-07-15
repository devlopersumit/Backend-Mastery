const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app  = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "Welcome To Note Taking App Server"
    });
});

const port = process.env.PORT | 6000;
app.listen(port, () => {
    console.log("Server is running successfully")
});