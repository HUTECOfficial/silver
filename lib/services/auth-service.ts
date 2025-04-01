import { createClientSupabaseClient } from "../supabase"

export const authService = {
  // Iniciar sesión con email y contraseña
  async signIn(email: string, password: string) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  // Cerrar sesión
  async signOut() {
    const supabase = createClientSupabaseClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obtener sesión actual
  async getSession() {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  // Verificar si el usuario es administrador
  async isAdmin() {
    const supabase = createClientSupabaseClient()
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) return false

    const { data, error } = await supabase.from("admin_users").select("role").eq("id", session.session.user.id).single()

    if (error || !data) return false
    return ["admin", "editor"].includes(data.role)
  },
}

