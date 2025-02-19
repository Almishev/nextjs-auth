import { connect } from "@/dbConfig/dbConfig";
import Room from "@/models/roomModel";
import type { Room as RoomType } from '@/types/room';

export async function getRooms(): Promise<RoomType[]> {
    try {
        await connect();
        const rooms = await Room.find({});
        return JSON.parse(JSON.stringify(rooms));
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return [];
    }
}

export async function getRoomByType(type: string): Promise<RoomType | null> {
    try {
        await connect();
        const room = await Room.findOne({ type });
        return room ? JSON.parse(JSON.stringify(room)) : null;
    } catch (error) {
        console.error('Error fetching room:', error);
        return null;
    }
} 