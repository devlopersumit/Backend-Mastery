import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();

//Built-in Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Database Connection
connectDB();

//Welcome Route
app.get("/", function (req, res) {
    res.send("Welcome to the User Auth API Server");
});

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 6000;
app.listen(port, function () {
    console.log(`Server is running successfully on port ${port}`)
});