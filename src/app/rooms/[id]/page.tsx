import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Room } from '@/types/room'

async function getRooms() {
  const res = await fetch('http://localhost:3000/api/rooms', {
    next: { revalidate: 3600 }
  });
  const data = await res.json();
  return data.rooms as Room[];
}

async function getRoom(id: string) {
  const rooms = await getRooms();
  return rooms.find((room) => room.type === id);
}

export async function generateStaticParams() {
  const rooms = await getRooms();
  return rooms.map((room) => ({
    id: room.type,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);
  
  if (!room) {
    return {
      title: 'Room Not Found',
      description: 'The requested room could not be found'
    }
  }

  return {
    title: `${room.name} - Luxury Stay`,
    description: room.description
  }
}

export default async function RoomPage({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);

  if (!room) {
    notFound();
  }

  return (
    <div style={{ background: '#f8fafc' }}>
      {/* Hero Section */}
      <section 
        className="hero-section rooms-hero" 
        style={{
          marginBottom: '30px', 
          height: '250px', 
          background: 'linear-gradient(rgba(30, 41, 59, 0.7), rgba(30, 41, 59, 0.8))'
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title" style={{ color: '#f8fafc' }}>{room.name}</h1>
          <p className="hero-subtitle" style={{ color: '#e2e8f0' }}>Experience luxury and comfort</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Left Side - Image */}
          <div style={{ flex: '0 0 40%' }}>
            <div className="featured-room">
              <div className="room-image-container">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="room-image"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Right Side - Room Details */}
          <div style={{ flex: '1' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              marginBottom: '1rem',
              color: '#1e293b',
              fontWeight: '600'
            }}>
              Room Details
            </h2>
            <p style={{ 
              color: '#475569',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              {room.description}
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                marginBottom: '0.5rem',
                background: '#fff',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <span style={{ color: '#64748b' }}>Size:</span>
                <span style={{ fontWeight: '600', color: '#334155' }}>{room.size}m²</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#666' }}>Capacity:</span>
                <span style={{ fontWeight: '600' }}>{room.capacity} persons</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#666' }}>Price:</span>
                <span style={{ fontWeight: '600' }}>${room.price}/night</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#666' }}>Status:</span>
                <span style={{ fontWeight: '600', color: '#22c55e' }}>Available</span>
              </div>
            </div>

            <div style={{ 
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                marginBottom: '1rem',
                color: '#1e293b',
                fontWeight: '600'
              }}>
                Amenities
              </h3>
              <ul style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '0.75rem' 
              }}>
                {room.amenities.map((amenity) => (
                  <li key={amenity} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: '#0ea5e9' }}>•</span>
                    <span style={{ color: '#475569' }}>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Features</h3>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {room.features.map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#3b82f6' }}>•</span>
                    <span style={{ color: '#4b5563' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              href="/booking" 
              style={{
                display: 'inline-block',
                width: '100%',
                padding: '1rem 2rem',
                textAlign: 'center',
                background: 'linear-gradient(to right, #0ea5e9, #0284c7)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '0.75rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(14, 165, 233, 0.2)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 