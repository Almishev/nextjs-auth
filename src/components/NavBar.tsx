'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface UserData {
  id: string;
  isAdmin: boolean;
}

interface NavBarProps {
  userData: UserData;
}

export default function NavBar({ userData: initialUserData }: NavBarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userData, setUserData] = useState(initialUserData)

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout')
      if (response.ok) {
        toast.success("Излязохте успешно")
        
        setUserData({ id: '', isAdmin: false })
        
        await new Promise(resolve => setTimeout(resolve, 1000))
       
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Грешка при излизане:', error)
      toast.error("Грешка при излизане")
    }
  }

  return (
    <nav className="bg-white shadow-md py-4 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3 animate-fadeIn">
          <div className="overflow-hidden rounded-full animate-pulse-slow">
            <Image
              src="/images/hotel-logo.jpg"
              alt="Лого на хотела"
              width={40}
              height={40}
              className="rounded-full transition-transform duration-500 hover:scale-110"
            />
          </div>
          <Link href="/" className="text-2xl font-bold text-sky-500 no-underline hover:text-sky-600 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
            Луксозен Престой
          </Link>
        </div>

        <button 
          className="md:hidden p-2.5 focus:outline-none transition-transform duration-300 hover:rotate-180" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`relative w-6 h-5`}>
            <span className={`absolute w-full h-0.5 bg-gray-800 rounded transition-all duration-300 ${isMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
            <span className={`absolute w-full h-0.5 bg-gray-800 rounded top-2 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute w-full h-0.5 bg-gray-800 rounded transition-all duration-300 ${isMenuOpen ? 'top-2 -rotate-45' : 'bottom-0'}`}></span>
          </div>
        </button>

        <div className={`md:flex items-center gap-6 
                        ${isMenuOpen 
                          ? 'absolute top-[68px] left-0 right-0 flex flex-col w-full bg-white shadow-md p-4 z-50 animate-slideIn' 
                          : 'hidden'} 
                        md:static md:shadow-none md:p-0 md:w-auto md:animate-fadeIn`}
        >
          <Link 
            href="/" 
            className={`${pathname === '/' ? 'text-sky-500 font-semibold' : 'text-gray-800'} 
                      hover:text-sky-500 transition-colors duration-300 no-underline font-medium 
                      ${isMenuOpen ? 'py-2 w-full text-center' : ''} 
                      hover:scale-105 transform transition-transform`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Начало
          </Link>
          <Link 
            href="/rooms" 
            className={`${pathname === '/rooms' ? 'text-sky-500 font-semibold' : 'text-gray-800'} 
                      hover:text-sky-500 transition-colors duration-300 no-underline font-medium 
                      ${isMenuOpen ? 'py-2 w-full text-center' : ''} 
                      hover:scale-105 transform transition-transform`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Стаи
          </Link>
          <Link 
            href="/about" 
            className={`${pathname === '/about' ? 'text-sky-500 font-semibold' : 'text-gray-800'} 
                      hover:text-sky-500 transition-colors duration-300 no-underline font-medium 
                      ${isMenuOpen ? 'py-2 w-full text-center' : ''} 
                      hover:scale-105 transform transition-transform`} 
            onClick={() => setIsMenuOpen(false)}
          >
            За нас
          </Link>
          
          {userData.id ? (
            <>
              <Link 
                href="/profile" 
                className={`${pathname === '/profile' ? 'text-sky-500 font-semibold' : 'text-gray-800'} 
                          hover:text-sky-500 transition-colors duration-300 no-underline font-medium 
                          ${isMenuOpen ? 'py-2 w-full text-center' : ''} 
                          hover:scale-105 transform transition-transform`} 
                onClick={() => setIsMenuOpen(false)}
              >
                Профил
              </Link>
              <Link 
                href="/profile/bookings" 
                className={`${pathname === '/profile/bookings' ? 'text-sky-500 font-semibold' : 'text-gray-800'} 
                          hover:text-sky-500 transition-colors duration-300 no-underline font-medium 
                          ${isMenuOpen ? 'py-2 w-full text-center' : ''} 
                          hover:scale-105 transform transition-transform`} 
                onClick={() => setIsMenuOpen(false)}
              >
                Моите резервации
              </Link>
              {userData.isAdmin && (
                <>
                  <Link 
                    href="/users" 
                    className={`${pathname === '/users' ? 'text-sky-500 font-semibold' : 'text-gray-800'} 
                              hover:text-sky-500 transition-colors duration-300 no-underline font-medium 
                              ${isMenuOpen ? 'py-2 w-full text-center' : ''} 
                              hover:scale-105 transform transition-transform`} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Потребители
                  </Link>
                  <Link 
                    href="/reservations" 
                    className={`${pathname === '/reservations' ? 'text-sky-500 font-semibold' : 'text-gray-800'} 
                              hover:text-sky-500 transition-colors duration-300 no-underline font-medium 
                              ${isMenuOpen ? 'py-2 w-full text-center' : ''} 
                              hover:scale-105 transform transition-transform`} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Всички резервации
                  </Link>
                </>
              )}
              <button 
                onClick={handleLogout}
                className="bg-transparent border-none text-gray-800 hover:text-sky-500 transition-colors duration-300 font-medium p-0 cursor-pointer hover:scale-105 transform"
              >
                Изход
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className={`${pathname === '/login' ? 'text-sky-500 font-semibold' : 'text-gray-800'} 
                          hover:text-sky-500 transition-colors duration-300 no-underline font-medium 
                          ${isMenuOpen ? 'py-2 w-full text-center' : ''} 
                          hover:scale-105 transform transition-transform`} 
                onClick={() => setIsMenuOpen(false)}
              >
                Вход
              </Link>
              <Link 
                href="/signup" 
                className={`${pathname === '/signup' ? 'text-sky-500 font-semibold' : 'text-gray-800'} 
                          hover:text-sky-500 transition-colors duration-300 no-underline font-medium 
                          ${isMenuOpen ? 'py-2 w-full text-center' : ''} 
                          hover:scale-105 transform transition-transform`} 
                onClick={() => setIsMenuOpen(false)}
              >
                Регистрация
              </Link>
            </>
          )}

          <Link 
            href="/booking" 
            className={`${pathname === '/booking' ? 'bg-indigo-500' : 'bg-indigo-400'} 
                      text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-500 transition-all duration-300 
                      ${isMenuOpen ? 'w-full text-center mt-2' : ''} 
                      hover:shadow-lg hover:-translate-y-1 animate-pulse-slow`}
            onClick={() => setIsMenuOpen(false)}
          >
            Резервирай сега
          </Link>
        </div>
      </div>
    </nav>
  )

  function isActive(path: string) {
    return pathname === path ? 'text-sky-500 font-semibold' : 'text-gray-800'
  }
}
