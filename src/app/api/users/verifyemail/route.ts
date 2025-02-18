import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";



connect()


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token} = reqBody

        console.log("Verifying email with token:", token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            console.log("Invalid or expired token");
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }
        console.log("User found, updating verification status");

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        console.log("Email verified successfully");

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error:any) {
        console.error("Email verification error:", error);
        return NextResponse.json({error: error.message}, {status: 500})
    }

}