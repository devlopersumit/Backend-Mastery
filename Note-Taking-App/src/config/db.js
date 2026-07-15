const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log('Server Connection Error: ' + error);
        process.exit(1);
    }
}

module.exports = connectDB;