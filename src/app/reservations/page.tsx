"use client";
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Calendar, Mail, Phone, User, Users, DollarSign, Clock, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface Reservation {
    _id: string;
    guestName: string;
    email: string;
    phone: string;
    startDate: string;
    endDate: string;
    numberOfGuests: number;
    totalPrice: number;
    roomId: {
        name: string;
        roomNumber: string;
    };
    createdAt: string;
}

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch('/api/reservations');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch reservations');
            }

            if (data.success) {
                setReservations(data.bookings);
                toast.success('Резервациите са заредени успешно');
            }
        } catch (error: any) {
            console.error('Error fetching reservations:', error);
            setError(error.message);
            toast.error('Грешка при зареждане на резервациите');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
       
        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);
        const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-semibold">
                                {reservation.roomId.name}
                            </h2>
                            <div className="text-sm text-indigo-100">
                                Стая №{reservation.roomId.roomNumber}
                            </div>
                        </div>
                        <div className="bg-white/20 text-white text-xs font-medium py-1 px-3 rounded-full backdrop-blur-sm">
                            Потвърдена
                        </div>
                    </div>
                </div>
                
                <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Информация за госта */}
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <User className="w-5 h-5 text-indigo-500 mt-0.5 mr-3" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Гост</div>
                                    <div className="font-medium">{reservation.guestName}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 text-indigo-500 mt-0.5 mr-3" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Имейл</div>
                                    <div className="text-sm text-gray-600">{reservation.email}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 text-indigo-500 mt-0.5 mr-3" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Телефон</div>
                                    <div className="text-sm text-gray-600">{reservation.phone}</div>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Calendar className="w-5 h-5 text-indigo-500 mt-0.5 mr-3" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Период</div>
                                    <div className="text-sm">
                                        <span className="font-medium">{formatDate(reservation.startDate)}</span>
                                        <span className="mx-2">→</span>
                                        <span className="font-medium">{formatDate(reservation.endDate)}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{nights} {nights === 1 ? 'нощувка' : 'нощувки'}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Users className="w-5 h-5 text-indigo-500 mt-0.5 mr-3" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Брой гости</div>
                                    <div className="font-medium">{reservation.numberOfGuests} {reservation.numberOfGuests === 1 ? 'гост' : 'госта'}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Clock className="w-5 h-5 text-indigo-500 mt-0.5 mr-3" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Дата на резервация</div>
                                    <div className="text-sm text-gray-600">{formatDate(reservation.createdAt)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-5 pt-5 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            ID: {reservation._id.substring(0, 8)}...
                        </div>
                        <div className="flex items-center bg-indigo-50 py-2 px-4 rounded-lg">
                            <DollarSign className="w-5 h-5 text-indigo-600 mr-1" />
                            <span className="text-indigo-700 font-bold">{reservation.totalPrice} лв.</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                <p className="text-gray-600">Зареждане на резервациите...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden p-8 text-center">
                    <div className="rounded-full bg-red-100 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Възникна грешка</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button 
                        onClick={fetchReservations}
                        className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Опитай отново
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-200px)] p-4 md:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                        Управление на резервации
                    </h1>
                    <button 
                        onClick={fetchReservations}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Обнови
                    </button>
                </div>
                
                {reservations.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 text-center my-8">
                        <div className="rounded-full bg-gray-100 p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4">
                            <Calendar className="w-12 h-12 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Няма намерени резервации</h2>
                        <p className="text-gray-500 max-w-md mx-auto">
                            В момента няма регистрирани резервации в системата. Новите резервации ще се появят тук.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {reservations.map((reservation) => (
                            <ReservationCard 
                                key={reservation._id} 
                                reservation={reservation}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('bg-BG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}