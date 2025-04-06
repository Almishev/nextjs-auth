'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

export default function ConfirmBooking() {
  const router = useRouter()
  const params = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [roomDetails, setRoomDetails] = useState<any>(null)
  const [totalPrice, setTotalPrice] = useState(0)

  const roomId = params?.get('roomId') || ''
  const startDate = params?.get('startDate') || ''
  const endDate = params?.get('endDate') || ''
  const guests = params?.get('guests') || '1'
  const name = params?.get('name') || ''
  const email = params?.get('email') || ''
  const phone = params?.get('phone') || ''

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`/api/rooms/${roomId}`)
        const data = await response.json()
        
       
        console.log('Room data:', data)
        
        
        const roomData = data.room || data
        setRoomDetails(roomData)
        
        
        if (startDate && endDate && roomData.price) {
          const start = new Date(startDate)
          const end = new Date(endDate)
          const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
          setTotalPrice(nights * roomData.price)
        }
      } catch (error) {
        console.error('Error fetching room details:', error)
        toast.error('Грешка при зареждане на детайлите за стаята')
      }
    }

    if (roomId) {
      fetchRoomDetails()
    }
  }, [roomId, startDate, endDate])

  const handleConfirm = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          startDate,
          endDate,
          guests: parseInt(guests || '1'),
          name,
          email,
          phone,
          totalPrice,
          roomName: roomDetails?.name
        }),
      })

      if (response.ok) {
      
        await fetch('/api/booking/send-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            bookingDetails: {
              startDate,
              endDate,
              guests,
              name,
              phone,
              email,
              totalPrice,
              roomName: roomDetails?.name
            }
          })
        });

        toast.success('Резервацията е потвърдена успешно!')
        router.push('/') 
      } else {
        const data = await response.json()
        toast.error(data.error || 'Възникна грешка при резервацията')
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      toast.error('Възникна грешка при резервацията')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="confirm-container">
      <h1 className="confirm-title">Потвърждение на резервация</h1>
      
      <div className="booking-details">
        <div className="dates-section">
          <h2>Детайли за престоя</h2>
          <p>Настаняване: {formatDate(startDate || '')}</p>
          <p>Напускане: {formatDate(endDate || '')}</p>
          <p>Основен гост: {name}</p>
          <p>Телефон: {phone}</p>
          <p>Имейл: {email}</p>
          <p>Брой гости: {guests}</p>
          {roomDetails && <p>Тип стая: {roomDetails.name}</p>}
        </div>

        <div className="price-section">
          <h2>Цена</h2>
          {roomDetails && (
            <>
              <p>Цена на нощувка: ${roomDetails.price}</p>
              <p>Брой нощувки: {Math.ceil(
                (new Date(endDate || '').getTime() - new Date(startDate || '').getTime()) / 
                (1000 * 60 * 60 * 24)
              )}</p>
              <p className="total-price">Обща цена: ${totalPrice}</p>
            </>
          )}
        </div>

        <div className="action-buttons">
          <button 
            onClick={handleConfirm} 
            className="confirm-button"
            disabled={loading}
          >
            {loading ? 'Обработка...' : 'Потвърди резервацията'}
          </button>
          
          <button 
            onClick={() => router.back()} 
            className="back-button"
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  )
} 