import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;

        // Валидация
        if (!email || !password) {
            return NextResponse.json({
                success: false,
                error: "Email and password are required"
            }, {status: 400})
        }

        await connect();
        const user = await User.findOne({email})
        
        if(!user){
            return NextResponse.json({
                success: false,
                error: "User not found"
            }, {status: 400})
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({
                success: false,
                error: "Invalid password"
            }, {status: 400})
        }

        // Създаване на токен
        const tokenData = {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        // Подобрени cookie настройки
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax", // Променено от "strict" на "lax"
            path: "/",
            maxAge: 86400
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: "Internal server error"
        }, {status: 500})
    }
}