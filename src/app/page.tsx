import Image from 'next/image'
import Link from 'next/link'
import type { Room } from '@/types/room'
import { getRooms } from '@/lib/rooms'

export default async function Home() {
  const rooms = await getRooms();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Luxury Stay</h1>
          <p className="hero-subtitle">Experience comfort and elegance in the heart of the city</p>
          <Link href="/rooms" className="cta-button">
            View Our Rooms
          </Link>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="section-title">Featured Rooms</h2>
        <div className="featured-rooms">
          {rooms.slice(0, 3).map((room) => (
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
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <h2 className="section-title">Hotel Amenities</h2>
        <div className="amenities-grid">
          <div className="amenity-item">
            <div className="amenity-icon">🌟</div>
            <h3>Free Wi-Fi</h3>
            <p>High-speed internet throughout the hotel</p>
          </div>
          <div className="amenity-item">
            <div className="amenity-icon">🅿️</div>
            <h3>Free Parking</h3>
            <p>Secure parking for all guests</p>
          </div>
          <div className="amenity-item">
            <div className="amenity-icon">🏊‍♂️</div>
            <h3>Swimming Pool</h3>
            <p>Outdoor pool with sundeck</p>
          </div>
          <div className="amenity-item">
            <div className="amenity-icon">🍳</div>
            <h3>Breakfast</h3>
            <p>Complimentary breakfast buffet</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">About Our Hotel</h2>
          <p className="about-text">
            Located in the heart of the city, Luxury Stay offers a perfect blend of comfort and elegance. 
            Our carefully designed rooms and exceptional service ensure a memorable stay for both business 
            and leisure travelers.
          </p>
          <div className="about-features">
            <div className="feature">
              <span className="feature-number">24/7</span>
              <p>Reception</p>
            </div>
            <div className="feature">
              <span className="feature-number">4</span>
              <p>Room Types</p>
            </div>
            <div className="feature">
              <span className="feature-number">100%</span>
              <p>Satisfaction</p>
            </div>
          </div>
          <Link href="/about" className="cta-button">
            Learn More
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience Luxury?</h2>
          <p>Book your stay now and get the best rates</p>
          <Link href="/booking" className="cta-button">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  )
}
