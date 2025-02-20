import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value

    // Защитени рутове
    const protectedPaths = ['/profile', '/users']
    const isProtectedPath = protectedPaths.some(pp => path.startsWith(pp))

    // Публични рутове
    const authPaths = ['/login', '/signup']
    const isAuthPath = authPaths.includes(path)

    // Редиректи
    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if (isAuthPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/profile',
        '/users',
        '/login',
        '/signup'
    ]
}