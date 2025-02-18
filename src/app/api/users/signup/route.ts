import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log("Signup request received:", reqBody);

        //check if user already exists
        const user = await User.findOne({email})
        console.log("Existing user check:", user ? "User exists" : "User does not exist");

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        console.log("Password hashed successfully");

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log("New user saved to database:", savedUser._id);

        //send verification email
        console.log("Attempting to send verification email...");
        try {
            await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
            console.log("Verification email sent successfully");
        } catch (emailError) {
            console.error("Error sending verification email:", emailError);
        }

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}