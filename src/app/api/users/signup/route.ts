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
            password: hashedPassword,
            isVerified: false,
            isAdmin: false,
            verifyToken: null,
            verifyTokenExpiry: null
        })

        const savedUser = await newUser.save()
        console.log("New user saved to database:", savedUser._id);

        //send verification email
        console.log("Attempting to send verification email...");
        try {
            console.log("Email configuration:", {
                EMAIL_HOST: process.env.EMAIL_HOST,
                EMAIL_PORT: process.env.EMAIL_PORT,
                EMAIL_USER: process.env.EMAIL_USER,
                DOMAIN: process.env.DOMAIN
            });
            
            await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});
            console.log("Verification email sent successfully");
        } catch (emailError: any) {
            console.error("Detailed email error:", {
                message: emailError.message,
                code: emailError.code,
                command: emailError.command,
                stack: emailError.stack
            });
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