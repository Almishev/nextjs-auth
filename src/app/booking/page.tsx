'use client'
import { useState } from 'react'
import DateRangePicker from '@/components/DateRangePicker'
import { useRouter } from 'next/navigation'

export default function BookingPage() {
  const router = useRouter()
  const [booking, setBooking] = useState({
    startDate: new Date(),
    endDate: new Date(),
    guests: 1,
    roomType: ''
  })

  const handleDateChange = (range: any) => {
    setBooking(prev => ({
      ...prev,
      startDate: range.startDate,
      endDate: range.endDate
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      })

      if (response.ok) {
        router.push('/booking/confirmation')
      }
    } catch (error) {
      console.error('Booking error:', error)
    }
  }

  return (
    <>
      <div className="hero-section" style={{marginBottom: '30px', height: '250px'}}>
        <div className="hero-content">
          <h1 className="hero-title">Book Your Stay</h1>
          <p className="hero-subtitle">Select your dates and room preferences</p>
        </div>
      </div>

      <div className="container">
        <div className="booking-container">
          <div className="calendar-section">
            <h2 className="section-title">Select Your Dates</h2>
            <DateRangePicker 
              onChange={handleDateChange}
              initialDateRange={{
                startDate: booking.startDate,
                endDate: booking.endDate,
                key: 'selection'
              }}
            />
          </div>

          <div className="booking-form">
            <div className="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                id="guests"
                min="1"
                max="5"
                value={booking.guests}
                onChange={(e) => setBooking(prev => ({
                  ...prev,
                  guests: parseInt(e.target.value)
                }))}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Room Type</label>
              <select
                id="roomType"
                value={booking.roomType}
                onChange={(e) => setBooking(prev => ({
                  ...prev,
                  roomType: e.target.value
                }))}
                className="form-select"
              >
                <option value="">Select a room type</option>
                <option value="standard">Standard Room</option>
                <option value="deluxe">Deluxe Room</option>
                <option value="suite">Suite</option>
              </select>
            </div>

            <button className="submit-button">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </>
  )
} 