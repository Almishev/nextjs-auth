import { connect } from "@/dbConfig/dbConfig";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const rooms = [
            {
                roomNumber: "101",
                name: "Classic Double Room",
                type: "classic-double",
                description: "Spacious room with city view, perfect for couples or business travelers.",
                price: 45,
                capacity: 2,
                size: 25,
                image: "/images/classic-room-cropped.jpg",
                amenities: [
                    "Queen-size bed",
                    "Free Wi-Fi",
                    "Air conditioning",
                    "Private bathroom",
                    "Flat-screen TV",
                    "Mini fridge"
                ],
                features: [
                    "City view",
                    "Daily housekeeping",
                    "Room service",
                    "Soundproof walls"
                ]
            },
            {
                roomNumber: "102",
                name: "Luxury Double Room",
                type: "luxury-double",
                description: "Elegant room with garden view, featuring premium amenities and extra comfort.",
                price: 45,
                capacity: 2,
                size: 30,
                image: "/images/luxury-room-cropped.jpg",
                amenities: [
                    "King-size bed",
                    "Free Wi-Fi",
                    "Air conditioning",
                    "Luxury bathroom",
                    "55-inch Smart TV",
                    "Mini bar"
                ],
                features: [
                    "Garden view",
                    "Premium toiletries",
                    "Bathrobe and slippers",
                    "Coffee machine"
                ]
            },
            {
                roomNumber: "103",
                name: "Modern Double Room",
                type: "modern-double",
                description: "Contemporary room with mountain view, designed for modern comfort.",
                price: 45,
                capacity: 2,
                size: 28,
                image: "/images/modern-room-cropped.jpg",
                amenities: [
                    "Queen-size bed",
                    "High-speed Wi-Fi",
                    "Climate control",
                    "Modern bathroom",
                    "Smart TV",
                    "Work desk"
                ],
                features: [
                    "Mountain view",
                    "USB charging ports",
                    "Bluetooth speaker",
                    "Ergonomic furniture"
                ]
            },
            {
                roomNumber: "201",
                name: "Luxury Apartment",
                type: "luxury-apartment",
                description: "Spacious apartment with panoramic views, perfect for families or extended stays.",
                price: 55,
                capacity: 4,
                size: 45,
                image: "/images/villa.jpg",
                amenities: [
                    "King-size bed",
                    "Living room",
                    "Kitchenette",
                    "Free Wi-Fi",
                    "Air conditioning",
                    "Two bathrooms",
                    "65-inch Smart TV",
                    "Full-size fridge"
                ],
                features: [
                    "Panoramic view",
                    "Separate living area",
                    "Dining area",
                    "Private balcony",
                    "Premium sound system",
                    "Washer/Dryer"
                ]
            }
        ];

        // Изтриваме всички съществуващи стаи и добавяме новите
        await Room.deleteMany({});
        await Room.insertMany(rooms);

        return NextResponse.json({
            message: "Rooms created successfully",
            success: true
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connect();
        const rooms = await Room.find({});
        return NextResponse.json({
            message: "Rooms fetched successfully",
            success: true,
            rooms
        });
    } catch (error: any) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
} 