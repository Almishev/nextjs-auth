"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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

export default function MyBookings() {
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const response = await axios.get('/api/users/me/bookings');
                setBookings(response.data.bookings);
                toast.success("Bookings loaded successfully");
            } catch (error: any) {
                toast.error("Error fetching bookings");
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, []);

    return (
        <div className="center">
            <div className="form-container">
                <h1 className="title">Моите резервации</h1>
                
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <>
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

                        <button 
                            onClick={() => router.push('/profile')}
                            className="button"
                        >
                            Back to Profile
                        </button>
                    </>
                )}
            </div>
        </div>
    );
} 