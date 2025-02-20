import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { headers } from 'next/headers'
import { getUserData } from '@/lib/auth'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Luxury Stay',
  description: 'Luxury hotel booking system',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userData = await getUserData();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar key={userData.id} userData={userData} />
        <main className="main-content">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
