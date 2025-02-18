import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        console.log("Received forgot password request for:", email);

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User with this email does not exist" },
                { status: 400 }
            );
        }

        console.log("User found, sending reset email");

        // Send reset password email
        await sendEmail({
            email,
            emailType: "RESET",
            userId: user._id
        });

        return NextResponse.json({
            message: "Password reset email sent successfully",
            success: true
        });

    } catch (error: any) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 