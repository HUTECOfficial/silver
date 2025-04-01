"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, BarChart2, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { pagesService, type Page } from "@/lib/services/pages-service"
import { productsService, type Product } from "@/lib/services/products-service"

export default function AdminDashboard() {
  const [recentPages, setRecentPages] = useState<Page[]>([])
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    products: 0,
    pages: 0,
    media: 0,
    texts: 0,
  })

  useEffect(() => {
    async function loadData() {
      try {
        // Cargar páginas recientes
        const pages = await pagesService.getPages()
        setRecentPages(pages.slice(0, 4))

        // Cargar productos recientes
        const products = await productsService.getProducts()
        setRecentProducts(products.slice(0, 4))

        // Actualizar estadísticas
        setStats({
          products: products.length,
          pages: pages.length,
          media: 0, // Esto se podría cargar de manera similar
          texts: 0, // Esto se podría cargar de manera similar
        })
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Productos"
          value={stats.products.toString()}
          description="Total de productos"
          icon={<ShoppingBag className="h-8 w-8 text-blue-500" />}
        />
        <StatCard
          title="Páginas"
          value={stats.pages.toString()}
          description="Páginas del sitio"
          icon={<FileText className="h-8 w-8 text-green-500" />}
        />
        <StatCard
          title="Imágenes"
          value={stats.media.toString()}
          description="Archivos multimedia"
          icon={<Image className="h-8 w-8 text-purple-500" />}
        />
        <StatCard
          title="Textos"
          value={stats.texts.toString()}
          description="Elementos de texto"
          icon={<FileText className="h-8 w-8 text-orange-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Páginas recientes</CardTitle>
            <CardDescription>Páginas recientemente editadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{page.title}</p>
                    <p className="text-sm text-gray-500">{new Date(page.updated_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/pages/edit?id=${page.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={page.slug} target="_blank">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos recientes</CardTitle>
            <CardDescription>Productos recientemente editados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{new Date(product.updated_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/products/edit?id=${product.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={product.slug} target="_blank">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function FileText(props: any) {
  return <BarChart2 {...props} />
}

function Image(props: any) {
  return <BarChart2 {...props} />
}

