import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, "Room ID is required"]
    },
    guestName: {
        type: String,
        required: [true, "Guest name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    startDate: {
        type: Date,
        required: [true, "Check-in date is required"]
    },
    endDate: {
        type: Date,
        required: [true, "Check-out date is required"]
    },
    numberOfGuests: {
        type: Number,
        required: [true, "Number of guests is required"]
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking; 