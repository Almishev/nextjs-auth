import Image from 'next/image'
import Link from 'next/link'
import type { Room } from '@/types/room'

async function getRooms() {
  const res = await fetch('http://localhost:3000/api/rooms', { cache: 'no-store' });
  const data = await res.json();
  return data.rooms as Room[];
}

export default async function Rooms() {
  const rooms = await getRooms();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section rooms-hero" style={{marginBottom: '30px', height: '250px'}}>
        <div className="hero-content">
          <h1 className="hero-title">Our Rooms</h1>
          <p className="hero-subtitle">Choose your perfect stay</p>
        </div>
      </section>

      {/* Rooms Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="featured-rooms">
          {rooms.map((room) => (
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
                <Link href={`/rooms/${room.type}`} className="hotel-button w-full">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 