import { connect } from "@/dbConfig/dbConfig";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const roomId = params.id;
        const room = await Room.findById(roomId);
        
        if (!room) {
            return NextResponse.json(
                { error: "Room not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            room: JSON.parse(JSON.stringify(room))
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
} 