import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    console.log("⚠️ Middleware ejecutándose para:", request.nextUrl.pathname);
    const session = request.cookies.get('session')?.value;
    console.log("⚠️ Cookie de sesión:", session ? "Existe" : "No existe");
    
    if (request.nextUrl.pathname.startsWith('/user') && !session) {
      console.log("⚠️ Redirigiendo a login porque no hay sesión");
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    console.log("⚠️ Permitiendo acceso a la ruta");
    return NextResponse.next();
  }

export const config = {
    matcher: [
        '/user/:path*',
    ],
}