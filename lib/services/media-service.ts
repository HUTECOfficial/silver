import { createClientSupabaseClient } from "../supabase"

export interface Media {
  id: number
  name: string
  url: string
  mime_type: string
  size: number
  dimensions?: { width: number; height: number }
  created_at: string
  updated_at: string
}

export const mediaService = {
  // Obtener todos los archivos multimedia
  async getMedia() {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data as Media[]
  },

  // Obtener un archivo multimedia por ID
  async getMediaById(id: number) {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("media").select("*").eq("id", id).single()

    if (error) throw error
    return data as Media
  },

  // Subir un archivo multimedia
  async uploadMedia(file: File) {
    const supabase = createClientSupabaseClient()

    // Subir el archivo al bucket de storage
    const fileName = `${Date.now()}-${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage.from("media").upload(fileName, file)

    if (uploadError) throw uploadError

    // Obtener la URL pública del archivo
    const { data: urlData } = await supabase.storage.from("media").getPublicUrl(fileName)

    // Crear un registro en la tabla media
    const { data: mediaData, error: mediaError } = await supabase
      .from("media")
      .insert([
        {
          name: file.name,
          url: urlData.publicUrl,
          mime_type: file.type,
          size: file.size,
          dimensions: file.type.startsWith("image/") ? await getImageDimensions(file) : null,
        },
      ])
      .select()
      .single()

    if (mediaError) throw mediaError
    return mediaData as Media
  },

  // Eliminar un archivo multimedia
  async deleteMedia(id: number) {
    const supabase = createClientSupabaseClient()

    // Primero obtener la información del archivo
    const { data: media, error: getError } = await supabase.from("media").select("*").eq("id", id).single()

    if (getError) throw getError

    // Extraer el nombre del archivo de la URL
    const fileName = media.url.split("/").pop()

    // Eliminar el archivo del storage
    const { error: deleteStorageError } = await supabase.storage.from("media").remove([fileName])

    if (deleteStorageError) throw deleteStorageError

    // Eliminar el registro de la tabla
    const { error: deleteRecordError } = await supabase.from("media").delete().eq("id", id)

    if (deleteRecordError) throw deleteRecordError
    return true
  },
}

// Función auxiliar para obtener las dimensiones de una imagen
async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.src = URL.createObjectURL(file)
  })
}

