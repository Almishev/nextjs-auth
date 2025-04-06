import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { headers } from 'next/headers'
import { getUserData } from '@/lib/auth'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Хотел Всички сезони',
  description: 'Хотел Всички сеизони. Резервационна система',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userData = await getUserData();

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NavBar userData={userData} />
        <main className="flex-grow max-w-7xl mx-auto px-4 pt-20 pb-8 w-full">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
