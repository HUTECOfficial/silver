import { createClientSupabaseClient } from "../supabase"

export interface Page {
  id: number
  title: string
  slug: string
  meta_title?: string
  meta_description?: string
  status: "draft" | "published"
  created_at: string
  updated_at: string
}

export interface PageSection {
  id: number
  page_id: number
  section_type: string
  section_data: any
  order_index: number
  created_at: string
  updated_at: string
}

export const pagesService = {
  // Obtener todas las páginas
  async getPages() {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("pages").select("*").order("updated_at", { ascending: false })

    if (error) throw error
    return data as Page[]
  },

  // Obtener una página por ID
  async getPageById(id: number) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("pages").select("*").eq("id", id).single()

    if (error) throw error
    return data as Page
  },

  // Obtener una página por slug
  async getPageBySlug(slug: string) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("pages").select("*").eq("slug", slug).single()

    if (error) throw error
    return data as Page
  },

  // Crear una nueva página
  async createPage(page: Omit<Page, "id" | "created_at" | "updated_at">) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("pages").insert([page]).select().single()

    if (error) throw error
    return data as Page
  },

  // Actualizar una página
  async updatePage(id: number, page: Partial<Omit<Page, "id" | "created_at" | "updated_at">>) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("pages").update(page).eq("id", id).select().single()

    if (error) throw error
    return data as Page
  },

  // Eliminar una página
  async deletePage(id: number) {
    const supabase = createClientSupabaseClient()
    const { error } = await supabase.from("pages").delete().eq("id", id)

    if (error) throw error
    return true
  },

  // Obtener secciones de una página
  async getPageSections(pageId: number) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page_id", pageId)
      .order("order_index", { ascending: true })

    if (error) throw error
    return data as PageSection[]
  },

  // Crear una sección de página
  async createPageSection(section: Omit<PageSection, "id" | "created_at" | "updated_at">) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("page_sections").insert([section]).select().single()

    if (error) throw error
    return data as PageSection
  },

  // Actualizar una sección de página
  async updatePageSection(id: number, section: Partial<Omit<PageSection, "id" | "created_at" | "updated_at">>) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("page_sections").update(section).eq("id", id).select().single()

    if (error) throw error
    return data as PageSection
  },

  // Eliminar una sección de página
  async deletePageSection(id: number) {
    const supabase = createClientSupabaseClient()
    const { error } = await supabase.from("page_sections").delete().eq("id", id)

    if (error) throw error
    return true
  },

  // Reordenar secciones de página
  async reorderPageSections(pageId: number, sectionIds: number[]) {
    const supabase = createClientSupabaseClient()

    // Crear un array de promesas para actualizar cada sección
    const updatePromises = sectionIds.map((sectionId, index) => {
      return supabase.from("page_sections").update({ order_index: index }).eq("id", sectionId).eq("page_id", pageId)
    })

    // Ejecutar todas las promesas
    await Promise.all(updatePromises)

    return true
  },
}

