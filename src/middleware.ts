import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Protect /dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      // Allow the client to handle auth if there's a token in the URL (for OAuth)
      const urlToken = request.nextUrl.searchParams.get('token')
      if (urlToken) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }
  }

  // Redirect /auth to /dashboard if already logged in
  if (pathname.startsWith('/auth')) {
    if (token && !pathname.includes('/error') && !pathname.includes('/success')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
  ],
}
