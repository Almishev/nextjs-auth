import mongoose from 'mongoose';
import Room from '@/models/roomModel';
import User from '@/models/userModel';
import Booking from '@/models/bookingModel';

export async function connect() {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }

        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
            // Уверяваме се, че моделите са регистрирани
            console.log('Models registered:', {
                Room: !!mongoose.models.Room,
                User: !!mongoose.models.User,
                Booking: !!mongoose.models.Booking
            });
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error:', err);
            process.exit();
        });

    } catch (error) {
        console.log('Connection error:', error);
    }
}

// Премахваме registerModels функцията, тъй като моделите
// се регистрират чрез импортите