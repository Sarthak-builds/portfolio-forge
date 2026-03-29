// Dummy middleware for proper auth

export function middleware() {
  // Add authentication check logic here, such as verifying the JWT token
  // from cookies or headers and redirecting to /auth/sign-in if unauthenticated
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
