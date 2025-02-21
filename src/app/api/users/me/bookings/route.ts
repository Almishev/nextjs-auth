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
        
        // Намираме email на потребителя
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Намираме резервациите по email
        const bookings = await Booking.find({ email: user.email })
            .populate('roomId')
            .sort({ startDate: -1 });

        return NextResponse.json({
            message: "User bookings fetched successfully",
            success: true,
            bookings
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
} 