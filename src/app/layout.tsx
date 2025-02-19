'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

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

  const isActive = (path: string) => {
    return pathname === path ? 'nav-link active' : 'nav-link'
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="navbar">
          <div className="nav-content">
               <Image

src="/images/hotel-logo.jpg"

alt="Hotel Logo"

width={40}

height={40}

className="rounded-full"

/>
            <Link href="/" className="nav-logo">
              AuthSystem
           
            </Link>
            <div className="nav-links">
            <Link href="/" className={isActive('/')}>Home</Link>
              <Link href="/rooms" className={isActive('/rooms')}>Rooms</Link>
              <Link href="/login" className={isActive('/login')}>Login</Link>
              <Link href="/signup" className={isActive('/signup')}>Sign Up</Link>
              <Link href="/login" className={isActive('/login')}>Book Now</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          {children}
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2024 AuthSystem. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
