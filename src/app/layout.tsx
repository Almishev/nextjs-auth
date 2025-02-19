'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'User Authentication',
  description: 'User authentication system with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Затваряме менюто при промяна на пътя
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path ? 'nav-link active' : 'nav-link'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Функция за затваряне на менюто
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
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

            {/* Бургер меню бутон */}
            <button className="mobile-menu-button" onClick={toggleMenu}>
              <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* Навигационни линкове */}
            <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
              <Link href="/" className={isActive('/')} onClick={handleLinkClick}>Home</Link>
              <Link href="/rooms" className={isActive('/rooms')} onClick={handleLinkClick}>Rooms</Link>
              <Link href="/about" className={isActive('/about')} onClick={handleLinkClick}>About</Link>
              <Link href="/login" className={isActive('/login')} onClick={handleLinkClick}>Login</Link>
              <Link href="/signup" className={isActive('/signup')} onClick={handleLinkClick}>Sign Up</Link>
              <Link 
                href="/booking" 
                className={`${isActive('/booking')} `}
                onClick={handleLinkClick}
              >
                Book Now
              </Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          {children}
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Luxury Stay. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
