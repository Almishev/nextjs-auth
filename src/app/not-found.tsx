import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="max-w-md w-[90%] p-8 bg-white/95 rounded-2xl shadow-lg backdrop-blur-md">
        <h1 className="text-2xl mb-6 text-center font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          404 - Страницата не е намерена
        </h1>
        
        <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-center">
          Не можем да намерим страницата, която търсите.
        </p>

        <div className="mt-8">
          <Link href="/" className="w-full py-3 px-4 bg-gradient-to-r from-indigo-400 to-purple-500 text-white border-none rounded-lg text-base font-semibold cursor-pointer my-4 block text-center transition duration-300 ease-in-out hover:translate-y-[-1px] hover:shadow-lg hover:shadow-indigo-200/20">
            Върнете се на началната страница
          </Link>

          <Link href="/rooms" className="text-indigo-500 no-underline font-medium block text-center mt-4 transition-colors hover:text-purple-500">
            Прегледайте нашите стаи
          </Link>

          <div className="text-center mt-6 text-gray-600">
            Нуждаете се от помощ? Свържете се с нас на{' '}
            <a href="tel:+359877382224" className="text-blue-600 hover:underline">
              (+359) 0877382224
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
