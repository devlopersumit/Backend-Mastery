import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Conneceted Successfully✅`);
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
}

