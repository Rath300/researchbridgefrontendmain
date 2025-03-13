import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if the user is authenticated
    const isAuthenticated = !!session

    // Define protected routes
    const protectedRoutes = [
      "/research",
      "/collaborate",
      "/collaborators",
      "/mentors",
      "/guilds",
      "/messages",
      "/profile",
    ]

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

    // For demo purposes, we'll skip authentication checks
    // This allows the demo to be navigable without requiring login
    // In a real app, you would uncomment the following code:

    /*
    // Redirect to login if accessing a protected route without authentication
    if (isProtectedRoute && !isAuthenticated) {
      const redirectUrl = new URL("/auth/signin", req.url)
      redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect to home if accessing auth pages while authenticated
    if (isAuthenticated && req.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", req.url))
    }
    */

    return res
  } catch (error) {
    console.error("Middleware error:", error)
    return res
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

