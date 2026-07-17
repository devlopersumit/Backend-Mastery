import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

//Built-in Middlewares
app.use(express.json());
app.use(cors());

//Database Connection
connectDB();

//Welcome Route
app.get("/", function(req, res){
    res.send("Welcome to the User Auth API Server");
});

const port = process.env.PORT || 6000;
app.listen(port, function() {
    console.log(`Server is running successfully on port ${port}`)
});