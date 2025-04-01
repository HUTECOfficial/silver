"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, Download, MoreHorizontal, Search, Trash, Upload } from "lucide-react"
import Image from "next/image"

// Datos de ejemplo para las imágenes
const IMAGES_DATA = [
  {
    id: 1,
    name: "hero-background.jpg",
    url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
    size: "1.2 MB",
    dimensions: "2070 x 1380",
    uploadedAt: "2023-11-15",
    type: "image/jpeg",
  },
  {
    id: 2,
    name: "sphere-ring-classic.jpg",
    url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    size: "0.8 MB",
    dimensions: "1770 x 1180",
    uploadedAt: "2023-11-14",
    type: "image/jpeg",
  },
  {
    id: 3,
    name: "spheres-collection.jpg",
    url: "https://images.unsplash.com/photo-1616697851009-1be942a5c803",
    size: "1.5 MB",
    dimensions: "2070 x 1380",
    uploadedAt: "2023-11-10",
    type: "image/jpeg",
  },
  {
    id: 4,
    name: "earrings.jpg",
    url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
    size: "0.9 MB",
    dimensions: "1887 x 1258",
    uploadedAt: "2023-11-08",
    type: "image/jpeg",
  },
  {
    id: 5,
    name: "necklaces.jpg",
    url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    size: "1.1 MB",
    dimensions: "1887 x 1258",
    uploadedAt: "2023-11-05",
    type: "image/jpeg",
  },
  {
    id: 6,
    name: "pendants.jpg",
    url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
    size: "0.7 MB",
    dimensions: "2070 x 1380",
    uploadedAt: "2023-10-20",
    type: "image/jpeg",
  },
]

export default function MediaAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [images, setImages] = useState(IMAGES_DATA)
  const [selectedImages, setSelectedImages] = useState<number[]>([])

  // Filtrar imágenes según el término de búsqueda
  const filteredImages = images.filter((image) => image.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleImageSelection = (id: number) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id))
    } else {
      setSelectedImages([...selectedImages, id])
    }
  }

  const handleSelectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map((image) => image.id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Biblioteca de medios</h1>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Subir imágenes
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar imágenes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {selectedImages.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{selectedImages.length} seleccionadas</span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={handleSelectAll}>
              {selectedImages.length === filteredImages.length ? "Deseleccionar todo" : "Seleccionar todo"}
            </Button>
            <span className="text-sm text-gray-500">{filteredImages.length} imágenes</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 ${
                  selectedImages.includes(image.id) ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => toggleImageSelection(image.id)}
              >
                <div className="relative aspect-square">
                  <Image src={image.url || "/placeholder.svg"} alt={image.name} layout="fill" objectFit="cover" />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  {selectedImages.includes(image.id) && (
                    <div className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-white" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar URL
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Download className="h-4 w-4 mr-2" />
                          Descargar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
                          <Trash className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="p-2 text-xs truncate">{image.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

