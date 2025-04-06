'use client'
export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { CheckCircle, ArrowLeft, Calendar, User, Phone, Mail, Users, Bed, CreditCard } from 'lucide-react'

function BookingConfirmContent() {
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
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="flex items-center justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
          <CheckCircle size={32} className="text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Потвърждение на резервация</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {roomDetails?.image && (
          <div className="relative h-64 w-full">
            <Image 
              src={roomDetails.image}
              alt={roomDetails.name || "Стая"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white">{roomDetails.name}</h2>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-2 mb-3">Детайли за престоя</h2>
              
              <div className="flex items-start">
                <Calendar size={18} className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 font-medium">Настаняване</p>
                  <p className="text-gray-800">{formatDate(startDate || '')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar size={18} className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 font-medium">Напускане</p>
                  <p className="text-gray-800">{formatDate(endDate || '')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users size={18} className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 font-medium">Брой гости</p>
                  <p className="text-gray-800">{guests}</p>
                </div>
              </div>
              
              {roomDetails && (
                <div className="flex items-start">
                  <Bed size={18} className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 font-medium">Тип стая</p>
                    <p className="text-gray-800">{roomDetails.name}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-2 mb-3">Лична информация</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <User size={18} className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 font-medium">Основен гост</p>
                    <p className="text-gray-800">{name}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={18} className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 font-medium">Имейл</p>
                    <p className="text-gray-800">{email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={18} className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 font-medium">Телефон</p>
                    <p className="text-gray-800">{phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-2 mb-3">
              <div className="flex items-center">
                <CreditCard size={20} className="text-indigo-500 mr-2" />
                <span>Ценова информация</span>
              </div>
            </h2>
            
            {roomDetails && (
              <div className="space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Цена на нощувка:</span>
                  <span className="font-medium">{roomDetails.price} лв.</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Брой нощувки:</span>
                  <span className="font-medium">{Math.ceil(
                    (new Date(endDate || '').getTime() - new Date(startDate || '').getTime()) / 
                    (1000 * 60 * 60 * 24)
                  )}</span>
                </div>
                
                <div className="border-t border-gray-200 my-2"></div>
                
                <div className="flex justify-between py-2 text-lg">
                  <span className="font-semibold text-gray-800">Обща цена:</span>
                  <span className="font-bold text-indigo-600">{totalPrice} лв.</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => router.back()} 
              className="py-3 px-5 rounded-lg flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
            >
              <ArrowLeft size={18} className="mr-2" />
              Назад
            </button>
            
            <button 
              onClick={handleConfirm} 
              disabled={loading}
              className="py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Обработка...
                </>
              ) : (
                <>
                  <CheckCircle size={18} className="mr-2" />
                  Потвърди резервацията
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmBooking() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto p-8 animate-pulse">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <BookingConfirmContent />
    </Suspense>
  )
} 