import Image from 'next/image'
import Link from 'next/link'
import type { Room } from '@/types/room'
import { getRooms } from '@/lib/rooms'
import { Search, Star } from 'lucide-react'

export default async function Rooms() {
  const rooms = await getRooms();

  return (
    <div>
      <section className="h-[350px] bg-black/60 bg-[url('/images/slider2.jpg')] bg-no-repeat bg-center bg-cover bg-blend-overlay flex items-center justify-center text-center text-white mb-8">
        <div className="max-w-3xl px-5">
          <h1 className="text-5xl font-bold mb-4 animate-fadeInDown">Нашите стаи</h1>
          <p className="text-xl mb-6 animate-fadeInUp">Изберете идеалното място за вашия лукс и комфорт</p>

        </div>
      </section>

      {/* Секция с препоръчана стая */}
      <section className="max-w-6xl mx-auto px-4 mb-16 animate-fadeIn">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-80 md:h-auto overflow-hidden">
              <Image
                src="/images/gallery5.jpg"
                alt="Премиум стая"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <div className="flex items-center mb-2">
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <span className="ml-2 text-sm text-gray-600">Най-висок рейтинг</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Премиум апартамент с изглед</h2>
              <p className="text-gray-600 mb-6">Луксозен апартамент с панорамен изглед, включва джакузи, король размер легло, седнал кът и луксозна баня. Идеален за специални случаи.</p>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="block text-sm text-gray-500">Стартираща цена</span>
                  <span className="text-3xl font-bold text-indigo-600">450 лв</span>
                  <span className="text-gray-600 ml-1">/ нощувка</span>
                </div>
                <div className="bg-indigo-100 rounded-lg py-2 px-4">
                  <span className="text-indigo-700 font-medium">-15% тази седмица</span>
                </div>
              </div>
              <Link href="/rooms/premium" className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium inline-block text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                Резервирайте сега
              </Link>
            </div>
          </div>
        </div>
      </section>
     
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center animate-fadeIn">Всички налични стаи</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div key={room._id} 
                 className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fadeInUp"
                 style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  priority
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full py-1 px-3">
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-xs font-medium">4.8</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{room.name}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-800">
                    <span className="text-2xl font-bold text-indigo-600">{room.price} лв</span> / нощувка
                  </span>
                  <span className="text-sm text-gray-500">Макс. 2 гости</span>
                </div>
                <Link href={`/rooms/${room.type}`} 
                      className="w-full block py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-center text-white rounded-lg font-medium transition-all duration-300 group">
                  <span className="flex items-center justify-center">
                    Виж детайли
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Галерия с изображения */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-gray-800 text-center animate-fadeIn">Галерия</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="grid gap-4">
              <div className="relative h-40 overflow-hidden rounded-lg group">
                <Image src="/images/gallery1.jpg" alt="Галерия на хотела" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="relative h-80 overflow-hidden rounded-lg group">
                <Image src="/images/gallery4.jpg" alt="Галерия на хотела" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="relative h-80 overflow-hidden rounded-lg group">
                <Image src="/images/slider1.jpg" alt="Галерия на хотела" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="relative h-40 overflow-hidden rounded-lg group">
                <Image src="/images/gallery2.jpg" alt="Галерия на хотела" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="relative h-40 overflow-hidden rounded-lg group">
                <Image src="/images/gallery5.jpg" alt="Галерия на хотела" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="relative h-80 overflow-hidden rounded-lg group">
                <Image src="/images/gallery1.jpg" alt="Галерия на хотела" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="relative h-80 overflow-hidden rounded-lg group">
                <Image src="/images/gallery4.jpg" alt="Галерия на хотела" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="relative h-40 overflow-hidden rounded-lg group">
                <Image src="/images/gallery2.jpg" alt="Галерия на хотела" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция за резервации */}
      <section className="py-16 bg-black/60 bg-[url('/images/gallery5.jpg')] bg-no-repeat bg-center bg-cover bg-blend-overlay">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white animate-fadeInDown">Готови да резервирате вашия престой?</h2>
          <p className="text-lg text-white/80 mb-8 animate-fadeInUp">Резервирайте директно за най-добрите цени и специални оферти само за вас.</p>
          <Link href="/booking" className="inline-block py-4 px-8 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-pulse-slow">
            Резервирайте сега
          </Link>
        </div>
      </section>
    </div>
  )
}
