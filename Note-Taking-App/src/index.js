const express = require('express');
const connectDB = require('./config/db');
const notesRouter = require('./routes/notes.routes');
require('dotenv').config();

const app  = express();

//Built-in Middlewares
app.use(express.json());

//DB CONNECTION
connectDB();

// ROUTES
app.use("/api/notes", notesRouter);

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log("Server is running successfully")
});