import { connect } from "@/dbConfig/dbConfig";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        const bookings = await Booking.find()
            .populate('roomId')  // Това ще зареди детайлите за стаята
            .sort({ createdAt: -1 }); // Сортираме по дата на създаване, най-новите първи

        return NextResponse.json({
            message: "Резервациите са заредени успешно",
            success: true,
            bookings
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}