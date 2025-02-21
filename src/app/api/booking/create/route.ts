import { connect } from "@/dbConfig/dbConfig";
import Booking from "@/models/bookingModel";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { 
            roomId,
            startDate, 
            endDate, 
            guests,
            name,
            email,
            phone,
            totalPrice
        } = reqBody;

        // Проверяваме дали стаята съществува и има достатъчен капацитет
        const room = await Room.findById(roomId);
        if (!room) {
            return NextResponse.json(
                { error: "Стаята не съществува" },
                { status: 404 }
            );
        }

        if (room.capacity < guests) {
            return NextResponse.json(
                { error: "Стаята няма достатъчен капацитет" },
                { status: 400 }
            );
        }

        // Проверяваме дали стаята е свободна за избраните дати
        const existingBooking = await Booking.findOne({
            roomId,
            status: { $ne: 'cancelled' },
            $or: [
                {
                    startDate: { $lte: new Date(endDate) },
                    endDate: { $gte: new Date(startDate) }
                }
            ]
        });

        if (existingBooking) {
            return NextResponse.json(
                { error: "Стаята е заета за избраните дати" },
                { status: 400 }
            );
        }

        // Създаваме новата резервация
        const newBooking = new Booking({
            roomId,
            guestName: name,
            email,
            phone,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            numberOfGuests: guests,
            totalPrice
        });

        const savedBooking = await newBooking.save();

        return NextResponse.json({
            message: "Резервацията е създадена успешно",
            success: true,
            booking: savedBooking
        });

    } catch (error: any) {
        console.error("Грешка при създаване на резервация:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
} 