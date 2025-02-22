import { connect } from "@/dbConfig/dbConfig";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        // Създаваме обект с днешната дата в началото на деня (00:00:00)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const bookings = await Booking.find({
            // Взимаме резервации, където крайната дата е след днешната
            endDate: { $gte: today }
        })
        .populate('roomId')
        .sort({ startDate: 1 }); // Сортираме по начална дата във възходящ ред

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