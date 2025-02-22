import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    try {
        const path = request.nextUrl.pathname
        const token = request.cookies.get('token')?.value
        console.error('DEBUG:', {  // използваме console.error вместо console.log
            path,
            hasToken: !!token,
            cookies: request.cookies.getAll()
        });

        // Защитени рутове - само за админи
        const adminPaths = ['/users', '/reservations']
        const isAdminPath = adminPaths.some(pp => path.startsWith(pp))

        // Защитени рутове - за регистрирани потребители
        const userPaths = [
            '/profile',
            '/profile/details',
            '/profile/bookings'
        ]
        const isUserPath = userPaths.some(pp => path.startsWith(pp))

        // Публични рутове
        const publicPaths = [
            '/',
            '/about',
            '/rooms',
            '/booking',
            '/booking/available-rooms',
            '/booking/confirm',
            '/verifyemail',
            '/resetpassword',
            '/forgotpassword',
            '/login',
            '/signup'
        ]
        const isPublicPath = publicPaths.some(pp => path.startsWith(pp))

        // Рутове за автентикация
        const authPaths = ['/login', '/signup']
        const isAuthPath = authPaths.includes(path)

        console.log('Path types:', {
            isAdminPath,
            isUserPath,
            isAuthPath
        });

        // Редиректи
        if ((isAdminPath || isUserPath) && !token) {
            console.log('Redirecting to login - protected route without token');
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }

        if (isAuthPath && token) {
            console.log('Redirecting to profile - auth path with token');
            return NextResponse.redirect(new URL('/profile', request.nextUrl))
        }
    } catch (error) {
        console.error('Middleware Error:', error);
        return NextResponse.redirect(new URL('/login', request.nextUrl))
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
        '/reservations/:path*',
        '/login',
        '/signup',
        '/verifyemail',
        '/resetpassword',
        '/forgotpassword'
    ]
}