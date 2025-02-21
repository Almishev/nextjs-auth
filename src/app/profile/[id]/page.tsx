"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Добавяме интерфейс за типа на потребителя
interface UserType {
    username: string;
    email: string;
    _id: string;
    isAdmin: boolean;
}

interface Booking {
    _id: string;
    startDate: string;
    endDate: string;
    numberOfGuests: number;
    totalPrice: number;
    roomId: {
        name: string;
        roomNumber: string;
    };
}

export default function UserProfile({ params }: any) {
    const router = useRouter();
    const [user, setUser] = useState<UserType>({
        username: "",
        email: "",
        _id: "",
        isAdmin: false
    });
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                // Зареждаме данните за потребителя
                const userResponse = await axios.get(`/api/users/me`);
                setUser(userResponse.data.data);

                // Зареждаме резервациите на потребителя
                const bookingsResponse = await axios.get(`/api/users/me/bookings`);
                setBookings(bookingsResponse.data.bookings);
                
                toast.success("Profile loaded successfully");
            } catch (error: any) {
                toast.error("Error fetching user details");
                router.push('/profile');
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [router]);

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">User Profile Details</h1>
                
                {loading ? (
                    <div className="profile-info">
                        <div className="info-item">
                            <p className="text">Loading user details...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="profile-info">
                            <div className="info-item">
                                <label className="label">USER ID</label>
                                <p className="text">{user._id}</p>
                            </div>
                            
                            <div className="info-item">
                                <label className="label">USERNAME</label>
                                <p className="text">{user.username}</p>
                            </div>
                            
                            <div className="info-item">
                                <label className="label">EMAIL ADDRESS</label>
                                <p className="text">{user.email}</p>
                            </div>
                            
                            <div className="info-item">
                                <label className="label">IS ADMIN</label>
                                <p className="text">{user.isAdmin ? "Yes" : "No"}</p>
                            </div>
                        </div>

                        <div className="my-bookings">
                            <h2 className="subtitle">Моите резервации</h2>
                            
                            {bookings.length === 0 ? (
                                <p className="no-bookings">Нямате направени резервации</p>
                            ) : (
                                <div className="bookings-grid">
                                    {bookings.map(booking => (
                                        <div key={booking._id} className="booking-card">
                                            <div className="booking-header">
                                                <h3>{booking.roomId.name}</h3>
                                                <span>Стая №{booking.roomId.roomNumber}</span>
                                            </div>
                                            <div className="booking-details">
                                                <p>От: {new Date(booking.startDate).toLocaleDateString('bg-BG')}</p>
                                                <p>До: {new Date(booking.endDate).toLocaleDateString('bg-BG')}</p>
                                                <p>Гости: {booking.numberOfGuests}</p>
                                                <p className="price">Цена: ${booking.totalPrice}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="button-group">
                            <button 
                                onClick={() => router.push('/profile')}
                                className="button"
                            >
                                Back to Profile
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}