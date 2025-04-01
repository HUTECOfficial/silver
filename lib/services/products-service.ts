import { createClientSupabaseClient } from "../supabase"

export interface Product {
  id: number
  name: string
  slug: string
  description?: string
  price: number
  image_url?: string
  status: "active" | "inactive" | "out_of_stock"
  category?: string
  created_at: string
  updated_at: string
}

export const productsService = {
  // Obtener todos los productos
  async getProducts() {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("products").select("*").order("updated_at", { ascending: false })

    if (error) throw error
    return data as Product[]
  },

  // Obtener un producto por ID
  async getProductById(id: number) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) throw error
    return data as Product
  },

  // Obtener un producto por slug
  async getProductBySlug(slug: string) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single()

    if (error) throw error
    return data as Product
  },

  // Crear un nuevo producto
  async createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("products").insert([product]).select().single()

    if (error) throw error
    return data as Product
  },

  // Actualizar un producto
  async updateProduct(id: number, product: Partial<Omit<Product, "id" | "created_at" | "updated_at">>) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("products").update(product).eq("id", id).select().single()

    if (error) throw error
    return data as Product
  },

  // Eliminar un producto
  async deleteProduct(id: number) {
    const supabase = createClientSupabaseClient()
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) throw error
    return true
  },

  // Obtener productos por categoría
  async getProductsByCategory(category: string) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("status", "active")
      .order("name", { ascending: true })

    if (error) throw error
    return data as Product[]
  },
}

