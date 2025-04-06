"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Users, DollarSign, Clock, ArrowLeft } from 'lucide-react';

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
                console.log("API Response:", response.data);
                setBookings(response.data.bookings);
                toast.success("Резервациите са заредени успешно");
            } catch (error: any) {
                console.error("Error loading bookings:", error);
                toast.error(error.response?.data?.error || "Грешка при зареждане на резервациите");
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden p-6 md:p-8 animate-fadeIn">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                        Моите резервации
                    </h1>
                    <button 
                        onClick={() => router.push('/profile')}
                        className="flex items-center px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Обратно към профила
                    </button>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <>
                        {bookings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="rounded-full bg-gray-100 p-5 mb-4">
                                    <Calendar className="w-10 h-10 text-gray-400" />
                                </div>
                                <p className="text-xl text-gray-600 mb-2">Нямате направени резервации</p>
                                <p className="text-gray-500 max-w-md">Разгледайте нашите стаи и направете своята първа резервация за незабравимо преживяване.</p>
                                <button 
                                    onClick={() => router.push('/booking')}
                                    className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                                >
                                    Резервирайте сега
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bookings.map(booking => (
                                    <div key={booking._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-4 px-5">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">{booking.roomId.name}</h3>
                                                    <span className="text-indigo-100 text-sm">Стая №{booking.roomId.roomNumber}</span>
                                                </div>
                                                <span className="bg-white/20 text-white text-xs font-medium py-1 px-2 rounded-full backdrop-blur-sm">
                                                    Потвърдена
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="mb-4 grid grid-cols-2 gap-4">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Настаняване</p>
                                                        <p className="text-sm font-medium">{new Date(booking.startDate).toLocaleDateString('bg-BG')}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Напускане</p>
                                                        <p className="text-sm font-medium">{new Date(booking.endDate).toLocaleDateString('bg-BG')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-3">
                                                <Users className="w-4 h-4 mr-2 text-indigo-500" />
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">{booking.numberOfGuests}</span> {booking.numberOfGuests === 1 ? 'гост' : 'госта'}
                                                </p>
                                            </div>
                                            <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    Резервирана
                                                </div>
                                                <div className="flex items-center bg-indigo-50 py-1 px-3 rounded-full">
                                                    <DollarSign className="w-4 h-4 mr-1 text-indigo-600" />
                                                    <span className="text-indigo-700 font-semibold">{booking.totalPrice} лв.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
} 