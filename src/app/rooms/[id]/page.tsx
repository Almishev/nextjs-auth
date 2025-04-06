import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Room } from '@/types/room'
import { getRooms, getRoomByType } from '@/lib/rooms'

export async function generateStaticParams() {
  const rooms = await getRooms();
  return rooms.map((room) => ({
    id: room.type,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const room = await getRoomByType(params.id);
  
  if (!room) {
    return {
      title: 'Стаята не е намерена',
      description: 'Заявената стая не може да бъде намерена'
    }
  }

  return {
    title: `${room.name} - Хотел Четири сезона`,
    description: room.description
  }
}

export default async function RoomPage({ params }: { params: { id: string } }) {
  const room = await getRoomByType(params.id);
  if (!room) return notFound();

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="h-[250px] bg-gray-800/70 flex items-center justify-center text-center mb-8">
        <div className="max-w-3xl px-5">
          <h1 className="text-4xl font-bold mb-2 text-gray-50">{room.name}</h1>
          <p className="text-xl text-gray-200">Изживейте лукс и комфорт</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Image */}
          <div className="lg:w-2/5">
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          {/* Right Side - Room Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Детайли за стаята
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {room.description}
            </p>
            
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-gray-500">Размер:</span>
                <span className="font-semibold text-gray-700">{room.size}m²</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-gray-500">Капацитет:</span>
                <span className="font-semibold text-gray-700">{room.capacity} души</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-gray-500">Цена:</span>
                <span className="font-semibold text-gray-700">${room.price}/нощувка</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-gray-500">Статус:</span>
                <span className="font-semibold text-green-600">Свободна</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Удобства
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-2">
                    <span className="text-blue-500">•</span>
                    <span className="text-gray-600">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Характеристики</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-blue-500">•</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              href="/booking" 
              className="block w-full py-4 px-6 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              Резервирайте сега
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
