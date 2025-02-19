import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log("Login attempt with:", { email, password: '****' });

        // Валидация на входните данни
        if (!email || !password) {
            console.log("Missing email or password");
            return NextResponse.json({
                success: false,
                error: "Email and password are required!"
            }, {status: 400})
        }

        // Валидация на email формата
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("Invalid email format:", email);
            return NextResponse.json({
                success: false,
                error: "Invalid email format!"
            }, {status: 400})
        }

        // Търсене на потребител
        console.log("Searching for user with email:", email);
        const user = await User.findOne({email})
        
        if(!user){
            console.log("User not found with email:", email);
            return NextResponse.json({
                success: false,
                error: "User not found!"
            }, {status: 400})
        }
        console.log("User found:", user.email);

        // Проверка на паролата
        console.log("Verifying password for user:", user.email);
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            console.log("Invalid password for user:", user.email);
            return NextResponse.json({
                success: false,
                error: "Wrong password!"
            }, {status: 400})
        }
        console.log("Password verified successfully");
        
        // Създаване на токен
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        }
        console.log("Creating token for user:", user.email);
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        console.log("Token created successfully");

        // Създаване на отговор
        const response = NextResponse.json({
            message: "Login successful!",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400 // 1 day
        })
        console.log("Login completed successfully for:", user.email);
        return response;

    } catch (error: any) {
        console.error("Login error:", error.message);
        return NextResponse.json(
            {error: "Something went wrong! Please try again."},
            {status: 500}
        )
    }
}