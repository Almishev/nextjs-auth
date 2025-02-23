import mongoose from 'mongoose';

export async function connect() {
    try {
        // Проверяваме дали вече сме свързани
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }

        // Свързваме се
        await mongoose.connect(process.env.MONGO_URI!);
        
        // Регистрираме моделите
        require('@/models/roomModel');
        require('@/models/userModel');
        require('@/models/bookingModel');

        console.log('MongoDB connected successfully');
        console.log('Models registered:', {
            Room: !!mongoose.models.Room,
            User: !!mongoose.models.User,
            Booking: !!mongoose.models.Booking
        });

        return mongoose.connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}