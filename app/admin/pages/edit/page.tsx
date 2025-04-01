"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Eye, Save, Trash, Plus, ImageIcon, Type, Layout } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Datos de ejemplo para las páginas
const PAGES_DATA = [
  {
    id: 1,
    title: "Página de inicio",
    path: "/",
    updatedAt: "2023-11-15",
    status: "Publicada",
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Silver Street Jewelry",
        subtitle: "Timeless elegance in everyday jewelry",
        buttonText: "Explore Collection",
        buttonLink: "/all-jewelry",
        backgroundImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
      },
      {
        id: "featured",
        type: "featured-product",
        title: "One Ring, Endless Possibilities",
        description:
          "Our Signature Sphere Rings let you express your look with interchangeable spheres. Whether you're aiming for subtle sophistication or a bold statement, this ring evolves with you — because elegance is truly personal.",
        buttonText: "Shop Now",
        buttonLink: "/products/sphere-rings/classic",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
      },
      {
        id: "categories",
        type: "categories",
        title: "Categories",
        items: [
          { name: "Sphere Rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e" },
          { name: "Spheres", image: "https://images.unsplash.com/photo-1616697851009-1be942a5c803" },
          { name: "Earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908" },
          { name: "Necklaces", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" },
        ],
      },
    ],
  },
  // Otros datos de páginas...
]

export default function EditPage() {
  const searchParams = useSearchParams()
  const pageId = searchParams.get("id")

  const [page, setPage] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("content")

  useEffect(() => {
    // Simulamos la carga de datos de la página
    if (pageId) {
      const foundPage = PAGES_DATA.find((p) => p.id.toString() === pageId)
      if (foundPage) {
        setPage(foundPage)
      }
    }
  }, [pageId])

  if (!page) {
    return <div>Cargando...</div>
  }

  const handleSectionChange = (sectionIndex: number, field: string, value: any) => {
    const updatedSections = [...page.sections]
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [field]: value,
    }

    setPage({
      ...page,
      sections: updatedSections,
    })
  }

  const handleAddSection = (type: string) => {
    const newSection = {
      id: `section-${Date.now()}`,
      type,
      title: `Nuevo ${type}`,
      // Otros campos por defecto según el tipo
    }

    setPage({
      ...page,
      sections: [...page.sections, newSection],
    })
  }

  const handleRemoveSection = (sectionIndex: number) => {
    const updatedSections = [...page.sections]
    updatedSections.splice(sectionIndex, 1)

    setPage({
      ...page,
      sections: updatedSections,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/pages">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Editar página</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={page.path} target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              Vista previa
            </Link>
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Guardar cambios
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Contenido</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Secciones</h2>
              <div className="flex gap-2">
                <Select onValueChange={(value) => handleAddSection(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Añadir sección" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="featured-product">Producto destacado</SelectItem>
                    <SelectItem value="categories">Categorías</SelectItem>
                    <SelectItem value="text">Texto</SelectItem>
                    <SelectItem value="gallery">Galería</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              {page.sections.map((section: any, index: number) => (
                <Card key={section.id} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        {section.type === "hero" && <Layout className="h-5 w-5 text-blue-500" />}
                        {section.type === "featured-product" && <ShoppingBag className="h-5 w-5 text-green-500" />}
                        {section.type === "categories" && <Grid className="h-5 w-5 text-purple-500" />}
                        {section.type === "text" && <Type className="h-5 w-5 text-orange-500" />}
                        {section.type === "gallery" && <ImageIcon className="h-5 w-5 text-pink-500" />}
                        <h3 className="text-lg font-medium capitalize">{section.type.replace("-", " ")}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveSection(index)}>
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    {section.type === "hero" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`hero-title-${index}`}>Título</Label>
                            <Input
                              id={`hero-title-${index}`}
                              value={section.title}
                              onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`hero-subtitle-${index}`}>Subtítulo</Label>
                            <Input
                              id={`hero-subtitle-${index}`}
                              value={section.subtitle}
                              onChange={(e) => handleSectionChange(index, "subtitle", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`hero-button-text-${index}`}>Texto del botón</Label>
                            <Input
                              id={`hero-button-text-${index}`}
                              value={section.buttonText}
                              onChange={(e) => handleSectionChange(index, "buttonText", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`hero-button-link-${index}`}>Enlace del botón</Label>
                            <Input
                              id={`hero-button-link-${index}`}
                              value={section.buttonLink}
                              onChange={(e) => handleSectionChange(index, "buttonLink", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`hero-bg-image-${index}`}>Imagen de fondo</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`hero-bg-image-${index}`}
                              value={section.backgroundImage}
                              onChange={(e) => handleSectionChange(index, "backgroundImage", e.target.value)}
                            />
                            <Button variant="outline">
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Seleccionar
                            </Button>
                          </div>
                          {section.backgroundImage && (
                            <div className="mt-2 relative h-40 rounded-md overflow-hidden">
                              <Image
                                src={section.backgroundImage || "/placeholder.svg"}
                                alt="Background preview"
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {section.type === "featured-product" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`featured-title-${index}`}>Título</Label>
                          <Input
                            id={`featured-title-${index}`}
                            value={section.title}
                            onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`featured-desc-${index}`}>Descripción</Label>
                          <Textarea
                            id={`featured-desc-${index}`}
                            value={section.description}
                            onChange={(e) => handleSectionChange(index, "description", e.target.value)}
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`featured-button-text-${index}`}>Texto del botón</Label>
                            <Input
                              id={`featured-button-text-${index}`}
                              value={section.buttonText}
                              onChange={(e) => handleSectionChange(index, "buttonText", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`featured-button-link-${index}`}>Enlace del botón</Label>
                            <Input
                              id={`featured-button-link-${index}`}
                              value={section.buttonLink}
                              onChange={(e) => handleSectionChange(index, "buttonLink", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`featured-image-${index}`}>Imagen</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`featured-image-${index}`}
                              value={section.image}
                              onChange={(e) => handleSectionChange(index, "image", e.target.value)}
                            />
                            <Button variant="outline">
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Seleccionar
                            </Button>
                          </div>
                          {section.image && (
                            <div className="mt-2 relative h-40 rounded-md overflow-hidden">
                              <Image
                                src={section.image || "/placeholder.svg"}
                                alt="Product preview"
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {section.type === "categories" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`categories-title-${index}`}>Título</Label>
                          <Input
                            id={`categories-title-${index}`}
                            value={section.title}
                            onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Categorías</Label>
                          <div className="space-y-2 mt-2">
                            {section.items?.map((item: any, itemIndex: number) => (
                              <div key={itemIndex} className="flex gap-4 items-center p-3 bg-gray-50 rounded-lg">
                                <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    layout="fill"
                                    objectFit="cover"
                                  />
                                </div>
                                <Input
                                  value={item.name}
                                  onChange={(e) => {
                                    const updatedItems = [...section.items]
                                    updatedItems[itemIndex] = {
                                      ...updatedItems[itemIndex],
                                      name: e.target.value,
                                    }
                                    handleSectionChange(index, "items", updatedItems)
                                  }}
                                  className="flex-1"
                                />
                                <Button variant="ghost" size="sm">
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            ))}
                            <Button variant="outline" size="sm" className="w-full">
                              <Plus className="h-4 w-4 mr-2" />
                              Añadir categoría
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="page-title">Título de la página</Label>
                <Input
                  id="page-title"
                  value={page.title}
                  onChange={(e) => setPage({ ...page, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="page-path">Ruta URL</Label>
                <Input id="page-path" value={page.path} onChange={(e) => setPage({ ...page, path: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="page-status">Estado</Label>
                <Select value={page.status} onValueChange={(value) => setPage({ ...page, status: value })}>
                  <SelectTrigger id="page-status">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Publicada">Publicada</SelectItem>
                    <SelectItem value="Borrador">Borrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="page-meta-title">Meta título (SEO)</Label>
                <Input id="page-meta-title" placeholder="Meta título para SEO" />
              </div>
              <div>
                <Label htmlFor="page-meta-description">Meta descripción (SEO)</Label>
                <Textarea id="page-meta-description" placeholder="Meta descripción para SEO" rows={3} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ShoppingBag(props: any) {
  return <Plus {...props} />
}

function Grid(props: any) {
  return <Plus {...props} />
}

