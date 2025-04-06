import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";

// Първо импортираме Room модела
import Room from "@/models/roomModel";
// После останалите модели
import User from "@/models/userModel";
import Booking from "@/models/bookingModel";

import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connect();
        
        // Проверяваме дали Room моделът е регистриран преди да продължим
        if (!mongoose.models.Room) {
            throw new Error("Room model is not registered");
        }

        // Проверяваме дали моделите са регистрирани
        console.log('Models check:', {
            Room: !!mongoose.models.Room,
            User: !!mongoose.models.User,
            Booking: !!mongoose.models.Booking
        });

        // Взимаме userId от токена
        const userId = await getDataFromToken(request);
        console.log("User ID from token:", userId);
        
        // Намираме email на потребителя
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        console.log("User email:", user.email);

        // Намираме резервациите
        const bookings = await Booking.find({ 
            email: { $regex: new RegExp('^' + user.email + '$', 'i') }
        })
        .sort({ startDate: -1 });
        
        console.log("Found bookings:", bookings);
        console.log("Query criteria:", { email: user.email });

        // Намираме стаите за тези резервации
        const roomIds = bookings.map(booking => booking.roomId);
        const rooms = await Room.find({ _id: { $in: roomIds } });

        // Комбинираме данните
        const bookingsWithRooms = bookings.map(booking => {
            const room = rooms.find(r => r._id.toString() === booking.roomId.toString());
            return {
                ...booking.toObject(),
                roomId: room
            };
        });

        return NextResponse.json({
            message: "User bookings fetched successfully",
            success: true,
            bookings: bookingsWithRooms
        });

    } catch (error: any) {
        console.error("Error in GET /api/users/me/bookings:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
} 