"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import '../styles/profile.css';

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

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">Profile</h1>
                {userData.id && <p className="text">Profile ID: {userData.id}</p>}
                {userData.isAdmin && <p className="text">Admin Status: Yes</p>}
                
                <div className="button-group">
                    <button 
                        onClick={() => router.push('/profile/details')}
                        className="button"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Моят профил"}
                    </button>

                    <button 
                        onClick={() => router.push('/profile/bookings')}
                        className="button-bookings"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Моите резервации"}
                    </button>

                    {/* Показваме бутона само ако потребителят е админ */}
                    {userData.isAdmin && (
                        <button 
                            onClick={() => router.push('/users')}
                            className="button-getUsers"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Всички потребители"}
                        </button>
                    )}
                    
                    <button 
                        onClick={() => {
                            axios.get('/api/users/logout')
                                .then(() => {
                                    toast.success('Успешен изход');
                                    router.push('/login');
                                })
                                .catch(() => toast.error('Грешка при изход'));
                        }}
                        className="button-secondary"
                    >
                        Изход
                    </button>
                </div>
            </div>
        </div>
    );
}