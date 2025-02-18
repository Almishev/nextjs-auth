import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest){
    try {
        const users = await User.find({}, 'username email isVerified isAdmin');
        console.log("All users:", users);
        
        return NextResponse.json({
            message: "Users found",
            data: users
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
} 