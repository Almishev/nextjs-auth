import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Luxury Stay',
  description: 'Luxury hotel booking system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
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
