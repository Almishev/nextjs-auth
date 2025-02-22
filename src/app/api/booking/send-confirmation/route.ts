import { NextResponse } from "next/server";
import { sendBookingConfirmation } from "@/helpers/mailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, bookingDetails } = body;

        await sendBookingConfirmation({ email, bookingDetails });

        return NextResponse.json({
            message: "Confirmation email sent successfully",
            success: true,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 