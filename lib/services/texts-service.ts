import { createClientSupabaseClient } from "../supabase"

export interface SiteText {
  id: number
  key: string
  value: string
  description?: string
  created_at: string
  updated_at: string
}

export const textsService = {
  // Obtener todos los textos
  async getTexts() {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("site_texts").select("*").order("key", { ascending: true })

    if (error) throw error
    return data as SiteText[]
  },

  // Obtener un texto por clave
  async getTextByKey(key: string) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("site_texts").select("*").eq("key", key).single()

    if (error) throw error
    return data as SiteText
  },

  // Crear un nuevo texto
  async createText(text: Omit<SiteText, "id" | "created_at" | "updated_at">) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("site_texts").insert([text]).select().single()

    if (error) throw error
    return data as SiteText
  },

  // Actualizar un texto
  async updateText(id: number, text: Partial<Omit<SiteText, "id" | "created_at" | "updated_at">>) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("site_texts").update(text).eq("id", id).select().single()

    if (error) throw error
    return data as SiteText
  },

  // Eliminar un texto
  async deleteText(id: number) {
    const supabase = createClientSupabaseClient()
    const { error } = await supabase.from("site_texts").delete().eq("id", id)

    if (error) throw error
    return true
  },
}

