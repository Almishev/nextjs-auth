import Image from 'next/image'
import Link from 'next/link'
import type { Room } from '@/types/room'
import { getRooms } from '@/lib/rooms'
import { Bold, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default async function Home() {
  const rooms = await getRooms();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="h-[80vh] bg-black/50 bg-[url('/images/slider3.jpg')] bg-no-repeat bg-center bg-cover bg-blend-overlay flex items-center justify-center text-center text-white">
        <div className="max-w-3xl px-5">
          <h1 className="text-5xl font-bold mb-4 animate-fadeInDown">Добре дошли в Четири сезона</h1>
          <p className="text-2xl mb-8 animate-fadeInUp">Изживейте комфорт и елегантност в сърцето на града</p>
          <Link href="/rooms" className="inline-block py-4 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fadeIn">
            Прегледайте нашите стаи
          </Link>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-white mt-5 animate-fadeIn">Препоръчани стаи</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.slice(0, 3).map((room, index) => (
            <div key={room._id} 
                 className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
                 style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <span className="block mb-4 text-gray-800">От ${room.price}/нощувка</span>
                <Link href={`/rooms/${room.type}`} className="w-full block py-3 px-4 bg-indigo-400 hover:bg-indigo-500 text-center text-white rounded-lg font-medium transition-all duration-300 hover:shadow-button">
                  Прегледайте детайлите
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white animate-fadeIn">Галерия</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeInUp">
            {/* Gallery Item 1 */}
            <div className="relative h-80 group overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02]">
              <Image 
                src="/images/gallery1.jpg" 
                alt="Хотелска галерия" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Лоби</p>
              </div>
            </div>
            
            {/* Gallery Item 2 */}
            <div className="relative h-80 group overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02]">
              <Image 
                src="/images/gallery2.jpg" 
                alt="Хотелска галерия" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Ресторант</p>
              </div>
            </div>
            
            {/* Gallery Item 3 */}
            <div className="relative h-80 group overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02]">
              <Image 
                src="/images/gallery4.jpg" 
                alt="Хотелска галерия" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Басейн</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 px-4 bg-white mt-5">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 animate-fadeIn">Услуги в хотела</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 bg-gray-50 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl mb-4 animate-pulse-slow">🌟</div>
            <h3 className="text-xl font-semibold mb-2">Безплатен Wi-Fi</h3>
            <p className="text-gray-600">Бърз интернет в целия хотел</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-4 animate-pulse-slow">🅿️</div>
            <h3 className="text-xl font-semibold mb-2">Безплатен паркинг</h3>
            <p className="text-gray-600">Сигурен паркинг за всички гости</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl mb-4 animate-pulse-slow">🏊‍♂️</div>
            <h3 className="text-xl font-semibold mb-2">Басейн</h3>
            <p className="text-gray-600">Открит басейн с тераса за слънчеви бани</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-4 animate-pulse-slow">🍳</div>
            <h3 className="text-xl font-semibold mb-2">Закуска</h3>
            <p className="text-gray-600">Безплатна закуска на бюфет</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800 animate-fadeIn">За нашия хотел</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12 animate-fadeInUp">
            Разположен в сърцето на града, Четири сезона предлага перфектно съчетание от комфорт и елегантност. 
            Нашите внимателно проектирани стаи и изключително обслужване осигуряват незабравимо преживяване за бизнес 
            и почивни пътувания.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-12 mb-12">
            <div className="text-center animate-zoomIn" style={{ animationDelay: '0.1s' }}>
              <span className="block text-4xl font-bold text-indigo-400 mb-2">24/7</span>
              <p className="text-gray-600 font-medium">Рецепция</p>
            </div>
            <div className="text-center animate-zoomIn" style={{ animationDelay: '0.3s' }}>
              <span className="block text-4xl font-bold text-indigo-400 mb-2">4</span>
              <p className="text-gray-600 font-medium">Видове стаи</p>
            </div>
            <div className="text-center animate-zoomIn" style={{ animationDelay: '0.5s' }}>
              <span className="block text-4xl font-bold text-indigo-400 mb-2">100%</span>
              <p className="text-gray-600 font-medium">Удовлетворение</p>
            </div>
          </div>
          <Link href="/about" className="inline-block py-3 px-6 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-button animate-fadeIn">
            Научете повече
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-black/70 bg-[url('/images/gallery5.jpg')] bg-no-repeat bg-center bg-cover bg-blend-overlay text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 animate-fadeInDown">Готови ли сте да изживеете лукс?</h2>
          <p className="text-xl mb-8 opacity-90 animate-fadeInUp">Резервирайте своя престой сега и получете най-добрите цени</p>
          <Link href="/booking" className="inline-block py-4 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-pulse-slow">
            Резервирайте сега
          </Link>
        </div>
      </section>
    </div>
  )
}
