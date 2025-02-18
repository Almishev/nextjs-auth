"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Добавяме интерфейс за userData
interface UserData {
    id: string;
    isAdmin: boolean;
}

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData>({
        id: "",
        isAdmin: false
    });
    const [loading, setLoading] = useState(false);

    // Добавяме useEffect за автоматично зареждане на данните
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const res = await axios.get('/api/users/me');
                const user = res.data.data;
                console.log("Loaded user data:", user); // За дебъгване
                
                setUserData({
                    id: user._id,
                    isAdmin: user.isAdmin
                });
            } catch (error: any) {
                console.error("Error loading user data:", error);
                toast.error("Failed to load user data");
            }
        };

        loadUserData();
    }, []);

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/users/me');
            const user = res.data.data;
            
            setUserData({
                id: user._id,
                isAdmin: user.isAdmin
            });
            
            toast.success('Redirecting to profile details...');
            router.push(`/profile/${user._id}`);
        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getAllUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/users/allusers');
            console.log(res.data);
            toast.success('Redirecting to users page...');
            router.push('/users');
        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    // Добавяме лог за дебъгване
    console.log("Current userData:", userData);

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">Profile</h1>
                {userData.id && <p className="text">Profile ID: {userData.id}</p>}
                {userData.isAdmin && <p className="text">Admin Status: Yes</p>}
                
                <div className="button-group">
                    <button 
                        onClick={getUserDetails}
                        className="button"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Get User Details"}
                    </button>

                    {/* Показваме бутона само ако потребителят е админ */}
                    {userData.isAdmin && (
                        <button 
                            onClick={getAllUsers}
                            className="button-getUsers"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Get All Users"}
                        </button>
                    )}
                    
                    <button 
                        onClick={logout}
                        className="button-secondary"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}