import mongoose from "mongoose";

// Проверяваме дали схемата вече съществува
const roomSchema = mongoose.models.Room?.schema || new mongoose.Schema({
    roomNumber: String,
    name: String,
    type: String,
    price: Number,
    capacity: Number,
    size: Number,
    description: String,
    image: String,
    amenities: [String],
    features: [String],
    isAvailable: {
        type: Boolean,
        default: true
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}, {
    timestamps: true
});

// Проверяваме дали моделът вече е регистриран
const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room; 