import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value

    // Защитени рутове - само за админи
    const adminPaths = ['/users']
    const isAdminPath = adminPaths.some(pp => path.startsWith(pp))

    // Защитени рутове - за регистрирани потребители
    const userPaths = ['/profile']
    const isUserPath = userPaths.some(pp => path.startsWith(pp))

    // Публични рутове
    const publicPaths = [
        '/',
        '/about',
        '/rooms',
        '/booking',
        '/booking/available-rooms',
        '/booking/confirm',
        '/login',
        '/signup'
    ]
    const isPublicPath = publicPaths.some(pp => path.startsWith(pp))

    // Рутове за автентикация
    const authPaths = ['/login', '/signup']
    const isAuthPath = authPaths.includes(path)

    // Редиректи
    if ((isAdminPath || isUserPath) && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if (isAuthPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',
        '/about',
        '/rooms/:path*',
        '/booking/:path*',
        '/profile/:path*',
        '/users/:path*',
        '/login',
        '/signup'
    ]
}