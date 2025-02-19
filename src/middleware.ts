import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Разделяме публичните пътища на две категории
  const isAuthPath = path === '/login' || 
                    path === '/signup' || 
                    path === '/verifyemail' ||
                    path === '/forgotpassword' ||
                    path === '/resetpassword'

  const isPublicPath = path === '/' ||
                    path === '/rooms' ||
                    path === '/about' ||
                    path === '/booking' ||
                    path.startsWith('/rooms/')

  const token = request.cookies.get('token')?.value || ''

  
  if(isAuthPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // За всички непублични пътища изискваме токен
  if (!isAuthPath && !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/users',
    '/profile/:path*',
    '/forgotpassword',
    '/resetpassword',
    '/rooms',
    '/about',
    '/booking',
    '/rooms/:path*'
  ]
}