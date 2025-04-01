import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerSupabaseClient } from "./lib/supabase"

export async function middleware(request: NextRequest) {
  // Verificar si la ruta comienza con /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Excluir la página de login
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Crear cliente de Supabase
    const supabase = createServerSupabaseClient()

    // Obtener la sesión del usuario
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Si no hay sesión, redirigir al login
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Verificar si el usuario es administrador
    const { data: adminUser } = await supabase.from("admin_users").select("role").eq("id", session.user.id).single()

    // Si no es administrador, redirigir al login
    if (!adminUser || !["admin", "editor"].includes(adminUser.role)) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

