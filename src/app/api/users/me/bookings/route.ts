import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        // Взимаме userId от токена
        const userId = await getDataFromToken(request);
        console.log("User ID from token:", userId);
        
        // Намираме email на потребителя
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        console.log("User email:", user.email);

        // Намираме резервациите по email (case insensitive)
        const bookings = await Booking.find({ 
            email: { $regex: new RegExp('^' + user.email + '$', 'i') }
        })
        .populate('roomId')
        .sort({ startDate: -1 });
        
        console.log("Found bookings:", bookings);
        console.log("Query criteria:", { email: user.email });

        return NextResponse.json({
            message: "User bookings fetched successfully",
            success: true,
            bookings
        });

    } catch (error: any) {
        console.error("Error in GET /api/users/me/bookings:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
} 