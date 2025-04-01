import { createClientSupabaseClient } from "../supabase"

export interface SiteSetting {
  id: number
  category: string
  settings: any
  created_at: string
  updated_at: string
}

export const settingsService = {
  // Obtener configuración por categoría
  async getSettingsByCategory(category: string) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("site_settings").select("*").eq("category", category).single()

    if (error && error.code !== "PGRST116") throw error // PGRST116 es "no se encontraron resultados"

    return data as SiteSetting | null
  },

  // Guardar configuración
  async saveSettings(category: string, settings: any) {
    const supabase = createClientSupabaseClient()

    // Verificar si ya existe la configuración
    const { data: existingData } = await supabase.from("site_settings").select("id").eq("category", category).single()

    if (existingData) {
      // Actualizar configuración existente
      const { data, error } = await supabase
        .from("site_settings")
        .update({ settings })
        .eq("id", existingData.id)
        .select()
        .single()

      if (error) throw error
      return data as SiteSetting
    } else {
      // Crear nueva configuración
      const { data, error } = await supabase.from("site_settings").insert([{ category, settings }]).select().single()

      if (error) throw error
      return data as SiteSetting
    }
  },
}

