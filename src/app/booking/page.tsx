"use client";
export const dynamic = "force-dynamic";

import { useState } from 'react'
import Image from 'next/image'
import DateRangePicker from '@/components/DateRangePicker'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Calendar, Users, Mail, Phone, User, CreditCard, CheckCircle } from 'lucide-react'

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
  const [step, setStep] = useState(1) // 1: Детайли на резервацията, 2: Допълнителна информация

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
      <div className="h-[350px] bg-black/60 bg-[url('/images/slider1.jpg')] bg-no-repeat bg-center bg-cover bg-blend-overlay flex items-center justify-center text-center text-white mb-8">
        <div className="max-w-3xl px-5 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-4 animate-fadeInDown">Резервирайте престоя си</h1>
          <p className="text-xl mb-6 animate-fadeInUp">Изберете дати и попълнете вашите данни за незабравимо преживяване</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Стъпки */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-3xl flex items-center">
            <div className={`flex-1 text-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white mb-2 ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                <Calendar size={18} />
              </div>
              <span className="text-sm font-medium">Избор на дати</span>
            </div>
            <div className={`flex-1 h-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className={`flex-1 text-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white mb-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                <Users size={18} />
              </div>
              <span className="text-sm font-medium">Лична информация</span>
            </div>
            <div className={`flex-1 h-1 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className={`flex-1 text-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white mb-2 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                <CheckCircle size={18} />
              </div>
              <span className="text-sm font-medium">Потвърждение</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-xl shadow-lg animate-fadeInUp">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-indigo-100 pb-2">Изберете дати на престоя</h2>
              <DateRangePicker 
                onChange={handleDateChange}
                initialDateRange={{
                  startDate: booking.startDate,
                  endDate: booking.endDate,
                  key: 'selection'
                }}
              />
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Информация за вашата резервация</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Пристигане</span>
                    <span className="font-medium">{booking.startDate.toLocaleDateString('bg-BG')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Заминаване</span>
                    <span className="font-medium">{booking.endDate.toLocaleDateString('bg-BG')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Брой нощувки</span>
                    <span className="font-medium">
                      {Math.ceil((booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setStep(2)} 
                  className="py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg flex items-center"
                >
                  Продължи 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-100 pb-2">Вашата информация</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <User size={16} className="text-indigo-500" />
                    Име
                  </label>
                  <input
                    type="text"
                    value={booking.name}
                    onChange={(e) => setBooking(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-base transition duration-300 ease-in-out bg-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Въведете вашето име"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <Mail size={16} className="text-indigo-500" />
                    Имейл
                  </label>
                  <input
                    type="email"
                    value={booking.email}
                    onChange={(e) => setBooking(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-base transition duration-300 ease-in-out bg-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <Phone size={16} className="text-indigo-500" />
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={booking.phone}
                    onChange={(e) => setBooking(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                    className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-base transition duration-300 ease-in-out bg-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder="+359 888 888 888"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <Users size={16} className="text-indigo-500" />
                    Брой гости
                  </label>
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
                    className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-base transition duration-300 ease-in-out bg-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    required
                  />
                </div>
              </div>

              <button 
                onClick={handleSubmit} 
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-lg text-base font-semibold cursor-pointer mt-6 transition duration-300 ease-in-out hover:shadow-lg hover:shadow-indigo-200/30 transform hover:-translate-y-1 flex items-center justify-center"
              >
                Проверка на наличност
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="mt-6">
              <div className="bg-white p-6 rounded-xl shadow-lg animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <CheckCircle size={24} className="text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Предимства на директните резервации</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Най-добри цени гарантирани
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Безплатно отменяне до 48ч преди настаняване
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Приоритетно настаняване
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Специални предложения за редовни клиенти
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Секция за промотиране на стаи */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fadeIn">Популярни избори</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-60 overflow-hidden">
                <Image 
                  src="/images/gallery2.jpg" 
                  alt="Премиум стая" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs py-1 px-2 rounded-lg uppercase font-bold tracking-wider">
                  Най-популярна
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Премиум стая</h3>
                <p className="text-gray-600 mb-4">Луксозна стая с всички удобства и изглед към града.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">От <span className="text-2xl font-bold text-indigo-600">250 лв</span> / нощувка</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-60 overflow-hidden">
                <Image 
                  src="/images/gallery5.jpg" 
                  alt="Делукс апартамент" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs py-1 px-2 rounded-lg uppercase font-bold tracking-wider">
                  Най-добра стойност
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Делукс апартамент</h3>
                <p className="text-gray-600 mb-4">Просторен апартамент с отделна спалня и хол.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">От <span className="text-2xl font-bold text-indigo-600">350 лв</span> / нощувка</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="relative h-60 overflow-hidden">
                <Image 
                  src="/images/gallery1.jpg" 
                  alt="Фамилен апартамент" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs py-1 px-2 rounded-lg uppercase font-bold tracking-wider">
                  Идеален за семейства
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Фамилен апартамент</h3>
                <p className="text-gray-600 mb-4">Просторен апартамент с две спални, подходящ за семейства.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">От <span className="text-2xl font-bold text-indigo-600">450 лв</span> / нощувка</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
