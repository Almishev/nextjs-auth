'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface UserData {
  id: string;
  isAdmin: boolean;
}

interface NavBarProps {
  userData: UserData;
}

export default function NavBar({ userData }: NavBarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path ? 'nav-link active' : 'nav-link'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
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
          <Link href="/" className="nav-logo" onClick={handleLinkClick}>
            Luxury Stay
          </Link>
        </div>

        <button className="mobile-menu-button" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <Link href="/" className={isActive('/')} onClick={handleLinkClick}>Home</Link>
          <Link href="/rooms" className={isActive('/rooms')} onClick={handleLinkClick}>Rooms</Link>
          <Link href="/about" className={isActive('/about')} onClick={handleLinkClick}>About</Link>
          {userData.id ? (
            <>
              {userData.isAdmin && <Link href="/admin" className={isActive('/admin')} onClick={handleLinkClick}>Admin</Link>}
              <Link href="/profile" className={isActive('/profile')} onClick={handleLinkClick}>Profile</Link>
              <Link href="/api/users/logout" className={isActive('/logout')} onClick={handleLinkClick}>Logout</Link>
            </>
          ) : (
            <>
              <Link href="/login" className={isActive('/login')} onClick={handleLinkClick}>Login</Link>
              <Link href="/signup" className={isActive('/signup')} onClick={handleLinkClick}>Sign Up</Link>
            </>
          )}
          <Link 
            href="/booking" 
            className={`${isActive('/booking')}`}
            onClick={handleLinkClick}
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  )
} 