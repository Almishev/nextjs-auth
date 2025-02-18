import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: [true, "Please enter room number"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Please enter room name"],
    },
    type: {
        type: String,
        required: [true, "Please enter room type"],
        enum: ["classic-double", "luxury-double", "modern-double", "luxury-apartment"]
    },
    price: {
        type: Number,
        required: [true, "Please enter price"],
    },
    capacity: {
        type: Number,
        required: [true, "Please enter room capacity"],
    },
    size: {
        type: Number,
        required: [true, "Please enter room size in m²"],
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
    },
    image: {
        type: String,
        required: [true, "Please enter image URL"],
    },
    amenities: [{
        type: String
    }],
    features: [{
        type: String
    }],
    isAvailable: {
        type: Boolean,
        default: true
    },
    // Полета за резервационната система
    bookings: [{
        startDate: Date,
        endDate: Date,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending'
        }
    }]
}, { timestamps: true });

const Room = mongoose.models.rooms || mongoose.model("rooms", roomSchema);

export default Room; 