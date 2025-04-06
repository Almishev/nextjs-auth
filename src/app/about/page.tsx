import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="h-[350px] bg-black/60 bg-[url('/images/gallery5.jpg')] bg-no-repeat bg-center bg-cover bg-blend-overlay flex items-center justify-center text-center mb-8">
        <div className="max-w-3xl px-5 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-2 text-white">За Нас</h1>
          <p className="text-xl text-gray-200">Открийте нашата история на лукс и съвършенство</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Лява част - Съдържание */}
          <div className="lg:w-3/5 animate-fadeInUp">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 inline-block border-b-2 border-indigo-400 pb-2">
              Нашата история
            </h2>
            
            <div className="mb-8 relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/gallery1.jpg"
                alt="Хотел Луксозен Престой"
                width={800}
                height={400}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <p className="text-white p-6 text-lg font-light italic">
                  "Луксозен и комфортен отдих в сърцето на града"
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Основан през 2010 г., Луксозен Престой предоставя изключителни хотелски услуги вече над десетилетие.
              Нашият ангажимент към съвършенството и внимание към детайла ни превърнаха в един от най-престижните хотели в региона.
            </p>

            <div className="bg-white p-8 rounded-lg shadow-sm mb-8 transform transition-all duration-300 hover:shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 inline-block border-b-2 border-indigo-400 pb-2">
                Нашите ценности
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Съвършенство в обслужването',
                  'Внимание към детайла',
                  'Удовлетвореност на клиентите',
                  'Устойчиви практики',
                  'Иновации',
                  'Ангажираност към общността'
                ].map((value) => (
                  <li key={value} className="flex items-center gap-3 group">
                    <span className="text-indigo-500 transition-transform duration-300 group-hover:scale-125">•</span>
                    <span className="text-gray-600 transition-colors duration-300 group-hover:text-indigo-700">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 transform transition-all duration-300 hover:translate-x-2">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 inline-block border-b-2 border-indigo-400 pb-2">
                Защо да изберете нас
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Превъзходна локация',
                  'Луксозни удобства',
                  'Професионален персонал',
                  'Гурме кухня',
                  'СПА и уелнес',
                  'Събитийни пространства'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 group">
                    <span className="text-indigo-500 transition-transform duration-300 group-hover:scale-125">•</span>
                    <span className="text-gray-600 transition-colors duration-300 group-hover:text-indigo-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Дясна част - Статистика */}
          <div className="lg:flex-1 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-bl-full opacity-50"></div>
              
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 inline-block border-b-2 border-indigo-400 pb-2 relative z-10">
                Нашите цифри
              </h3>
              
              <div className="space-y-5 relative z-10">
                <div className="flex justify-between p-5 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors duration-300 transform hover:-translate-y-1">
                  <span className="text-gray-600 font-medium">Години опит</span>
                  <span className="font-bold text-indigo-600 text-xl">13+</span>
                </div>
                <div className="flex justify-between p-5 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors duration-300 transform hover:-translate-y-1">
                  <span className="text-gray-600 font-medium">Луксозни стаи</span>
                  <span className="font-bold text-indigo-600 text-xl">150+</span>
                </div>
                <div className="flex justify-between p-5 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors duration-300 transform hover:-translate-y-1">
                  <span className="text-gray-600 font-medium">Доволни гости</span>
                  <span className="font-bold text-indigo-600 text-xl">15K+</span>
                </div>
                <div className="flex justify-between p-5 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors duration-300 transform hover:-translate-y-1">
                  <span className="text-gray-600 font-medium">Членове на екипа</span>
                  <span className="font-bold text-indigo-600 text-xl">100+</span>
                </div>
              </div>
            </div>

            <div className="mb-8 relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/gallery2.jpg"
                alt="Ресторант"
                width={500}
                height={300}
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <p className="text-white p-6 text-lg">
                  Нашият елегантен ресторант
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-100 rounded-br-full opacity-50"></div>
              
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 inline-block border-b-2 border-indigo-400 pb-2 relative z-10">
                Контактна информация
              </h3>
              
              <div className="space-y-5 relative z-10">
                <div className="text-gray-600 hover:text-indigo-700 transition-colors duration-300 transform hover:translate-x-2">
                  <strong className="text-gray-800 block mb-1">Адрес:</strong>
                  ул. Луксозна 123<br />
                  Център, 10001
                </div>
                <div className="text-gray-600 hover:text-indigo-700 transition-colors duration-300 transform hover:translate-x-2">
                  <strong className="text-gray-800 block mb-1">Телефон:</strong>
                  +359 (888) 123-4567
                </div>
                <div className="text-gray-600 hover:text-indigo-700 transition-colors duration-300 transform hover:translate-x-2">
                  <strong className="text-gray-800 block mb-1">Имейл:</strong>
                  info@luxhotel.bg
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Допълнителна галерия */}
      <section className="py-16 bg-gray-900 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fadeIn">Разгледайте нашите съоръжения</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative overflow-hidden h-80 rounded-lg shadow-lg animate-fadeInUp">
              <Image 
                src="/images/gallery4.jpg" 
                alt="Басейн" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-xl font-semibold text-white p-6">Открит басейн</h3>
              </div>
            </div>
            <div className="relative overflow-hidden h-80 rounded-lg shadow-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <Image 
                src="/images/gallery5.jpg" 
                alt="СПА център" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-xl font-semibold text-white p-6">СПА център</h3>
              </div>
            </div>
            <div className="relative overflow-hidden h-80 rounded-lg shadow-lg animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Image 
                src="/images/slider1.jpg" 
                alt="Конферентна зала" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-xl font-semibold text-white p-6">Конферентна зала</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
