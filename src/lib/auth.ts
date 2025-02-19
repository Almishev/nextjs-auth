import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

interface UserData {
  id: string;
  isAdmin: boolean;
}

export async function getUserData(): Promise<UserData> {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;

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