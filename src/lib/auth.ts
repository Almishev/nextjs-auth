import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { headers } from 'next/headers';
import { verify } from 'jsonwebtoken';

export async function getUserData() {
    try {
        const headersList = headers();
        const token = headersList.get('token');

        if (!token) {
            return { id: '', isAdmin: false };
        }

        const decodedToken: any = verify(token, process.env.TOKEN_SECRET!);
        await connect();
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return { id: '', isAdmin: false };
        }

        return {
            id: user._id.toString(),
            isAdmin: user.isAdmin || false
        };
    } catch (error) {
        console.error('Error getting user data:', error);
        return { id: '', isAdmin: false };
    }
} 