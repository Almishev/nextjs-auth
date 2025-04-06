import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    const isPublicPath = path === '/login' || 
                         path === '/signup' || 
                         path === '/verifyemail' || 
                         path === '/forgotpassword' ||
                         path === '/resetpassword' ||
                         path === '/' ||
                         path === '/about' ||
                         path === '/rooms' ||
                         path.startsWith('/rooms/') ||
                         path === '/booking';
                         
    const token = request.cookies.get('token')?.value || '';
    
    // Redirect to login if accessing protected route without token
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Redirect to profile if accessing login/signup with valid token
    if (isPublicPath && token && (path === '/login' || path === '/signup')) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }
    
    return NextResponse.next();
}

// Define paths that will trigger the middleware
export const config = {
    matcher: [
        // Protected routes that require authentication
        '/profile/:path*',
        '/users/:path*',
        '/reservations',
        '/booking/confirm',
        '/booking/available-rooms',
        
        // Public routes we want to conditionally redirect from
        '/login',
        '/signup',
        '/verifyemail',
        '/forgotpassword', 
        '/resetpassword',
    ]
}