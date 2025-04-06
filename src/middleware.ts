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
                         path === '/booking' ||
                         path === '/booking/available-rooms' ||
                         path === '/booking/confirm';
                         
    const token = request.cookies.get('token')?.value || '';
    
   
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    
    if (isPublicPath && token && (path === '/login' || path === '/signup')) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }
    
    return NextResponse.next();
}


export const config = {
    matcher: [
        
        '/profile/:path*',
        '/users/:path*',
        '/reservations',
        
        
        '/login',
        '/signup',
        '/verifyemail',
        '/forgotpassword', 
        '/resetpassword',
    ]
}