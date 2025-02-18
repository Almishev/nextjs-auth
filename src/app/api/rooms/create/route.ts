import { connect } from "@/dbConfig/dbConfig";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            roomNumber,
            name,
            type,
            description,
            price,
            capacity,
            size,
            image,
            amenities,
            features
        } = reqBody;

        // Създаване на нова стая
        const newRoom = new Room({
            roomNumber,
            name,
            type,
            description,
            price,
            capacity,
            size,
            image,
            amenities,
            features
        });

        const savedRoom = await newRoom.save();

        return NextResponse.json({
            message: "Room created successfully",
            success: true,
            room: savedRoom
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 