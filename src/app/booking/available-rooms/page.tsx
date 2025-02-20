import Image from 'next/image'
import Link from 'next/link'
import { getRooms } from '@/lib/rooms'
import type { Room } from '@/types/room'

interface Props {
  searchParams: {
    startDate: string;
    endDate: string;
    guests: string;
    name: string;
    email: string;
    phone: string;
  }
}

export default async function AvailableRooms({ searchParams }: Props) {
  const rooms = await getRooms();
  
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const availableRooms = rooms.filter(room => room.capacity >= parseInt(searchParams.guests))

  return (
    <div>
      <section className="hero-section rooms-hero" style={{marginBottom: '30px', height: '250px'}}>
        <div className="hero-content">
          <h1 className="hero-title">Available Rooms</h1>
          <p className="hero-subtitle">
            For {searchParams.guests} guests from {formatDate(searchParams.startDate)} to {formatDate(searchParams.endDate)}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="featured-rooms">
          {availableRooms.map((room) => (
            <div key={room._id} className="featured-room">
              <div className="room-image-container">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="room-image"
                  priority
                />
              </div>
              <div className="room-details">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <span className="room-price">From ${room.price}/night</span>
                <Link 
                  href={`/booking/confirm?roomId=${room._id}&startDate=${searchParams.startDate}&endDate=${searchParams.endDate}&guests=${searchParams.guests}&name=${searchParams.name}&email=${searchParams.email}&phone=${searchParams.phone}`}
                  className="book-now-button"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 