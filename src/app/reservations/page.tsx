"use client";
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import '../styles/reservations.css';

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

    const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
        <div className="reservation-card">
            <div className="reservation-header">
                <h2 className="text-xl font-semibold">
                    {reservation.roomId.name}
                </h2>
                <div className="text-sm">
                    Стая №{reservation.roomId.roomNumber}
                </div>
            </div>
            
            <div className="reservation-content">
                <div className="guest-info">
                    <div className="info-label">Гост</div>
                    <div className="info-value">{reservation.guestName}</div>
                    <div className="info-label">Контакти</div>
                    <div className="info-value">{reservation.email}</div>
                    <div className="info-value">{reservation.phone}</div>
                </div>

                <div className="booking-info">
                    <div className="info-label">Настаняване</div>
                    <div className="info-value">{formatDate(reservation.startDate)}</div>
                    <div className="info-label">Напускане</div>
                    <div className="info-value">{formatDate(reservation.endDate)}</div>
                    <div className="info-label">Брой гости</div>
                    <div className="info-value">{reservation.numberOfGuests}</div>
                </div>

                <div className="price">
                    Обща цена: ${reservation.totalPrice}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return <div className="loading">Зареждане...</div>;
    }

    if (error) {
        return (
            <div className="error-message">
                Грешка: {error}
                <button 
                    onClick={fetchReservations}
                    className="retry-button"
                >
                    Опитай отново
                </button>
            </div>
        );
    }

    return (
        <div className="reservations-container">
            <h1 className="reservations-title">Резервации</h1>
            
            {reservations.length === 0 ? (
                <div className="empty-message">
                    Няма намерени резервации
                </div>
            ) : (
                <div className="reservations-grid">
                    {reservations.map((reservation) => (
                        <ReservationCard 
                            key={reservation._id} 
                            reservation={reservation}
                        />
                    ))}
                </div>
            )}
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