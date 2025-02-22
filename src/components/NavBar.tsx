'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
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
        toast.success("Logged out successfully")
        // Изчакваме малко toast-а да се покаже
        await new Promise(resolve => setTimeout(resolve, 1000))
        window.location.reload() // Това ще презареди страницата и ще обнови навигацията
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error("Error logging out")
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <Image
            src="/images/hotel-logo.jpg"
            alt="Hotel Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <Link href="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
            Luxury Stay
          </Link>
        </div>

        <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <Link href="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/rooms" className={isActive('/rooms')} onClick={() => setIsMenuOpen(false)}>
            Rooms
          </Link>
          <Link href="/about" className={isActive('/about')} onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          
          {userData.id ? (
            <>
              <Link href="/profile" className={isActive('/profile')} onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
              <Link href="/profile/bookings" className={isActive('/profile/bookings')} onClick={() => setIsMenuOpen(false)}>
                My Reservations
              </Link>
              {userData.isAdmin && (
                <>
                  <Link href="/users" className={isActive('/users')} onClick={() => setIsMenuOpen(false)}>
                    Users
                  </Link>
                  <Link href="/reservations" className={isActive('/reservations')} onClick={() => setIsMenuOpen(false)}>
                    All Reservations
                  </Link>
                </>
              )}
              <button 
                onClick={handleLogout}
                className="nav-link"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={isActive('/login')} onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link href="/signup" className={isActive('/signup')} onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}

          <Link 
            href="/booking" 
            className={isActive('/booking')}
            onClick={() => setIsMenuOpen(false)}
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  )

  function isActive(path: string) {
    return pathname === path ? 'nav-link active' : 'nav-link'
  }
} 