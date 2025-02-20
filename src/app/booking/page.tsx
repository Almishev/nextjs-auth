'use client'
import { useState } from 'react'
import DateRangePicker from '@/components/DateRangePicker'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function BookingPage() {
  const router = useRouter()
  const [booking, setBooking] = useState({
    startDate: new Date(),
    endDate: new Date(),
    guests: 1,
    name: '',
    email: '',
    phone: ''
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
    
    if (!booking.name || !booking.email || !booking.phone) {
      toast.error('Моля, попълнете всички полета')
      return
    }

    const startDate = new Date(booking.startDate)
    const endDate = new Date(booking.endDate)
    
    const formattedStartDate = startDate.toISOString().split('T')[0]
    const formattedEndDate = endDate.toISOString().split('T')[0]
    
    const queryParams = new URLSearchParams({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      guests: booking.guests.toString(),
      name: booking.name,
      email: booking.email,
      phone: booking.phone
    })
    
    router.push(`/booking/available-rooms?${queryParams.toString()}`)
  }

  return (
    <>
      <div className="hero-section" style={{marginBottom: '30px', height: '250px'}}>
        <div className="hero-content">
          <h1 className="hero-title">Book Your Stay</h1>
          <p className="hero-subtitle">Select your dates and provide your details</p>
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
              <label>Име</label>
              <input
                type="text"
                value={booking.name}
                onChange={(e) => setBooking(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                className="form-input"
                placeholder="Въведете вашето име"
                required
              />
            </div>

            <div className="form-group">
              <label>Имейл</label>
              <input
                type="email"
                value={booking.email}
                onChange={(e) => setBooking(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                className="form-input"
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Телефон</label>
              <input
                type="tel"
                value={booking.phone}
                onChange={(e) => setBooking(prev => ({
                  ...prev,
                  phone: e.target.value
                }))}
                className="form-input"
                placeholder="+359 888 888 888"
                required
              />
            </div>

            <div className="form-group">
              <label>Брой гости</label>
              <input
                type="number"
                id="guests"
                min="1"
                max="4"
                value={booking.guests}
                onChange={(e) => setBooking(prev => ({
                  ...prev,
                  guests: parseInt(e.target.value)
                }))}
                className="form-input"
                required
              />
            </div>

            <button onClick={handleSubmit} className="submit-button">
              Провери наличност
            </button>
          </div>
        </div>
      </div>
    </>
  )
} 