import { connect } from "@/dbConfig/dbConfig";
import Room from "@/models/roomModel";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const guests = parseInt(searchParams.get('guests') || '1');

        // Намираме всички стаи с достатъчен капацитет
        const allRooms = await Room.find({ capacity: { $gte: guests } });

        // Намираме всички резервации за периода
        const existingBookings = await Booking.find({
            $or: [
                {
                    startDate: { $lte: new Date(endDate || '') },
                    endDate: { $gte: new Date(startDate || '') }
                }
            ]
        });

        // Филтрираме заетите стаи
        const bookedRoomIds = existingBookings.map(booking => booking.roomId.toString());
        const availableRooms = allRooms.filter(room => 
            !bookedRoomIds.includes(room._id.toString())
        );

        return NextResponse.json({
            success: true,
            rooms: availableRooms
        });

    } catch (error: any) {
        console.error("Error fetching available rooms:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
} 