import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/bookingModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { startDate, endDate, guests, roomType } = reqBody;

        // Валидация
        if (!startDate || !endDate || !guests || !roomType) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Създаване на резервация
        const newBooking = new Booking({
            userId,
            startDate,
            endDate,
            guests,
            roomType,
            status: 'pending'
        });

        const savedBooking = await newBooking.save();

        return NextResponse.json({
            message: "Booking created successfully",
            success: true,
            booking: savedBooking
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 