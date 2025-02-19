import mongoose from 'mongoose';

export async function connect() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        // Validate MongoDB URI format
        if (!process.env.MONGO_URI.startsWith('mongodb://') && !process.env.MONGO_URI.startsWith('mongodb+srv://')) {
            throw new Error('Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://');
        }

        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        return conn;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}