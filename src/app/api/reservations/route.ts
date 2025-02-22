import { connect } from "@/dbConfig/dbConfig";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";
import Room from "@/models/roomModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const bookings = await Booking.find()
            .populate('roomId')
            .sort({ startDate: -1 });

        return NextResponse.json({
            message: "Reservations fetched successfully",
            success: true,
            bookings
        });

    } catch (error: any) {
        console.error("Error in GET /api/reservations:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// Опционално: Добавяме endpoint за взимане на минали резервации
export async function POST(request: NextRequest) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const bookings = await Booking.find({
            endDate: { $lt: today }
        })
        .populate('roomId')
        .sort({ startDate: -1 }); // Сортираме по начална дата в низходящ ред

        return NextResponse.json({
            message: "Минали резервации заредени успешно",
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